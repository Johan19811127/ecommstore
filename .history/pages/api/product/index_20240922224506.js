export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { name, description, group, creditor, status, images, sizes } = req.body;

        // Validate required fields
        if (!name || !group || !sizes || sizes.length === 0 || !images || images.length === 0) {
          return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        // Create the product
        const newProduct = new Product({
          name,
          description,
          group,
          creditor,
          status,
          images,
        });

        const savedProduct = await newProduct.save();

        // Create the items for the product
        const itemPromises = sizes.map((size) => {
          const newItem = new Item({
            name,
            size: size.size,
            quantity: 0,
            totalCost: 0,
            selling: size.selling,
            product: savedProduct._id,
          });
          return newItem.save();
        });

        await Promise.all(itemPromises);

        res.status(201).json({ message: 'Product and items created successfully' });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}