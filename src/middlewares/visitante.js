const { IP, Visitante } = require('../models');

async function novoIP(req) {
  try {
    const novoIp = await IP.upsert(req.ip);
    return novoIp;
  } catch (e) {
    /*
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
    */
    return null; // TODO - RETORNAR PARA PRIMEIRA FUNÇÃO E LÁ TRATAR - NÃO DEVOLVER ESSE DA RES
  }
}

async function novoVisitante(req) {
  // NOVO IP
  const novoIpId = await novoIP(req);
  //
  try {
    const nVisitante = await Visitante.create({
      IpId: novoIpId.id,
      agente: req.headers['user-agent'] ? req.headers['user-agent'].substr(0, 254) : null,
    });
    return nVisitante.id;
  } catch (e) {
    /*
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
    */
    return null; // TODO - RETORNAR PARA PRIMEIRA FUNÇÃO E LÁ TRATAR - NÃO DEVOLVER ESSE DA RES
  }
}

async function checkVisitanteMiddleware(req, res, next) {
  let visitante = null;
  if (req.cookies.visitante) {
    visitante = await Visitante.findByPk(req.cookies.visitante);
  }

  if (!visitante) {
    // NOVO VISITANTE
    const novoVisitanteId = await novoVisitante(req, res);
    //
    res.cookie('visitante', novoVisitanteId, { maxAge: 1000000000000 }); // TODO - TRY CATCH
  }

  next();
}

module.exports = { checkVisitanteMiddleware };
