const router = require('express').Router();
const { Category, Product, Product_Tag } = require('../../models');
// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
      const categoryData = await Category.findAll(
        {
          include: [ {model: Product/*, attributes: ['product_name']*/}]

        }
      );
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // JOIN with Product,
      include: [{ model: Product/*, attributes: ['category_id']*/ }]
    });
      
    if (!categoryData) {
      res.status(404).json({ message: 'No categories found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new category
router.post('/', async (req, res) => {
    try {
      const categoryData = await Category.create({
      category_name:  req.body.category_name});
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });



  // update a category by its `id` value
  router.put('/:id', (req, res) => {
    // Calls the update method on the Category model
    Category.update(
      {
        // All the fields you can update and the data attached to the request body.
        category_name: req.body.category_name
 
      },
      {
        // Gets the category based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedCatName) => {
        // Sends the updated category as a json response
        res.json(updatedCatName);
      })
      .catch((err) => res.json(err));
  });


  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;