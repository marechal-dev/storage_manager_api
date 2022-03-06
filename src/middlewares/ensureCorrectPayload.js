function ensureCorrectPayload(request, response, next) {
  const { username, password } = request.body;

  if (!username || !password) {
    return response.status(401).json({ error: "Por favor, insira e-mail e senha." });
  }

  next();
}

module.exports = { ensureCorrectPayload }
