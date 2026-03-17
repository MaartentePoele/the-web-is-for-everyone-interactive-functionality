import express from "express";
import { Liquid } from "liquidjs";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./views");

app.get("/", async function (req, res) {
  const params = {
    fields: "name,image,amount,slug,id",
  };

  if (req.query.price) {
    params["filter[amount][_between]"] = "0," + req.query.price;
  } else {
    params["sort"] = "id";
  }

  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/milledoni_products/?" +
      new URLSearchParams(params),
  );
  const productResponseJSON = await productResponse.json();

  res.render("index.liquid", {
    products: productResponseJSON.data,
  });
});

app.get("/gifts/:tags", async function (req, res) {
  const params = {
    fields: "name,image,amount,slug,id",
    "filter[tags][_contains]": req.params.tags,
  };

  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/milledoni_products/?" +
      new URLSearchParams(params),
  );
  const productResponseJSON = await productResponse.json();

  res.render("index.liquid", {
    products: productResponseJSON.data,
  });
});

app.get("/gift/:slug", async function (req, res) {
  const params = {
    fields: "name,image,amount,description,id",
    "filter[slug][_eq]": req.params.slug,
  };

  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/milledoni_products/?" +
      new URLSearchParams(params),
  );
  const productResponseJSON = await productResponse.json();

  res.render("gift.liquid", {
    product: productResponseJSON.data[0],
  });
});

app.get("/wishlist", async function (req, res) {
  const params = {
    fields:
      "liked_products.milledoni_products_id.slug," +
      "liked_products.milledoni_products_id.image," +
      "liked_products.milledoni_products_id.name," +
      "liked_products.milledoni_products_id.amount," +
      "liked_products.milledoni_products_id.id",
  };

  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/milledoni_users/58/?" +
      new URLSearchParams(params),
  );
  const productResponseJSON = await productResponse.json();

  console.log(productResponseJSON.data);

  res.render("wishlist.liquid", {
    products: productResponseJSON.data,
  });
});

app.post("/", async function (request, response) {
  const fetchResponse = await fetch(
    "https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1",
    {
      method: "POST",
      body: JSON.stringify({
        milledoni_users_id: 58,
        milledoni_products_id: request.body.id,
      }),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    },
  );

  const fetchResponseJSON = await fetchResponse.json();
  console.log(fetchResponseJSON);

  response.redirect(303, request.header("Referer") || "/");
});

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`http://localhost:${app.get("port")}`);
});
