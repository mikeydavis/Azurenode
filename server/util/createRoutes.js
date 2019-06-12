const createRoutes = (controller, router) => {

    router.param('id', controller.params);

    router.route('/');

    router.route('/')
        .get(controller.get)

    router.route('/:id')
        .get(controller.getOne)

};

module.exports = createRoutes;