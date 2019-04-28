module.exports = (model, toEntity) => {
  this.model = model;
  const getAll = attrs =>
    model.findAll({ attrs }).then(entity =>
      entity.map(data => {
        const { dataValues } = data;
        return toEntity(dataValues);
      })
    );

  const create = domain =>
    model.create(domain).then(({ dataValues }) => {
      return toEntity(dataValues);
    });

  const update = (domain, id) => model.update(domain, { where: { id } });

  const destroy = id => model.destroy({ where: { id } });

  const findById = id =>
    model.findById(id).then(entity => {
      const { dataValues } = entity;
      return toEntity(dataValues);
    });

  return {
    getAll,
    create,
    update,
    destroy,
    findById
  };
};
