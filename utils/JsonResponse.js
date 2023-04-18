const JsonResponse = (res, code, data, message) => {
    res.status(code).json({
        code,
        data,
        message
    });
}

module.exports = JsonResponse;