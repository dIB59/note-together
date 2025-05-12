use actix::{Actor, StreamHandler, AsyncContext, ActorContext};
use actix_web_actors::ws;
use sqlx::AnyPool;
use yrs::{updates::decoder::Decode, Doc, Transact, Update};
use crate::infra::db::{load_doc, save_doc};

pub struct NoteSession {
    id: String,
    doc: Doc,
    pool: AnyPool,
}

impl NoteSession {
    pub fn new(id: String, pool: AnyPool) -> Self {
        let doc = Doc::new();
        Self { id, doc, pool }
    }
}

impl Actor for NoteSession {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        let id = self.id.clone();
        let pool = self.pool.clone();
        let addr = ctx.address();
        actix::spawn(async move {
            if let Ok(doc) = load_doc(&pool, &id).await {
                addr.do_send(LoadedDoc(doc));
            }
        });
    }
}

struct LoadedDoc(Doc);
impl actix::Message for LoadedDoc {
    type Result = ();
}

impl actix::Handler<LoadedDoc> for NoteSession {
    type Result = ();

    fn handle(&mut self, msg: LoadedDoc, ctx: &mut Self::Context) {
        self.doc = msg.0;
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for NoteSession {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Binary(bin)) => {
                let update = Update::decode_v1(&bin).unwrap();
                let mut txn = self.doc.transact_mut();
                txn.apply_update(update);
                ctx.binary(bin);
                let id = self.id.clone();
                let doc = self.doc.clone();
                let pool = self.pool.clone();
                actix::spawn(async move {
                    let _ = save_doc(&pool, &doc, &id).await;
                });
            }
            Ok(ws::Message::Close(_)) => ctx.stop(),
            _ => {}
        }
    }
}