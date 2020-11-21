function Response(code, message, content) {
    this.code = code;
    this.message = message;
    this.content = content;
    return this
}

module.exports = function(code, message, content) {
    code = code || 200
    message = message || ''
    content = content || ''
    return new Response(code, message, content)
}