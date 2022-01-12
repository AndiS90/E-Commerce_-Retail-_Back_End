const router = require('express').Router();
const {
  Tag,
  Product,
  Product_Tag
} = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
        // JOIN with product using the Product_Tag through table
        include: [{
          model: Product,
          through: Product_Tag,
          as: 'Tag_Products'
        }]
      }

    );


    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }



});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // JOIN with product, using the Product_Tag through table
      // JOIN with product using the Product_Tag through table
      include: [{
        model: Product,
        through: Product_Tag,
        as: 'Tag_Products'
      }]
    });

    if (!tagData) {
      res.status(404).json({
        message: 'No tag found with this id!'
      });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value


  try {
    const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name
    }, 
    {
      where: {
        id: req.params.id
    },

    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

//   Tag.update({
//       tag_name: req.body.tag_name

//     }, {
//       where: {
//         id: req.params.id,
//       },
//     })
//     .then((tag) => {
//       // find all associated products from ProductTag
//       return Product_Tag.findAll({
//         where: {
//           tag_id: req.params.id
//         }
//       });
//     })
//     .then((tagProducts) => {
//       // get list of current product_ids
//       const tagProductIds = tagProducts.map(({
//         product_id
//       }) => product_id);
//       // create filtered list of new product_ids
//       const newTagProducts = req.body.productIds
//         .filter((product_id) => !tagProductIds.includes(product_id))
//         .map((product_id) => {
//           return {
//             tag_id: req.params.id,
//             product_id,
//           };
//         });
//       // figure out which ones to remove
//       const tagProductsToRemove = tagProducts
//         .filter(({
//           product_id
//         }) => !req.body.productIds.includes(product_id))
//         .map(({
//           id
//         }) => id);

//       // run both actions
//       return Promise.all([
//         Product_Tag.destroy({
//           where: {
//             id: tagProductsToRemove
//           }
//         }),
//         Product_Tag.bulkCreate(newTagProducts),
//       ]);
//     })
//     .then((updatedTagProducts) => res.json(updatedTagProducts))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });



router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({
        message: 'No tag found with this id!'
      });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;