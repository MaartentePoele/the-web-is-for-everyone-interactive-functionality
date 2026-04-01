> Ontwerp en maak voor een opdrachtgever een interactieve toepassing die voor iedereen toegankelijk is. De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/the-web-is-for-everyone-interactive-functionality/blob/main/docs/INSTRUCTIONS.md)

# Milledoni
Een website om cadeau-ideeën op te doen.

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual of video toe 📸 -->
Check [hier](https://the-web-is-for-everyone-interactive-3mf1.onrender.com/) de website.
<img width="1125" height="2436" alt="image" src="https://github.com/user-attachments/assets/c57c9a16-9092-44b0-9762-e595c40ff836" />

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
User story: Als gebruiker wil ik cadeaus kunnen toevoegen aan mijn verlanglijstje, zodat ik mijn cadeaus kan bewaren en later makkelijk terugvinden.

Je kan met de button op elk cadeautje het cadeau toevoegen aan je verlanglijstje.
<img width="1406" height="874" alt="Group 689" src="https://github.com/user-attachments/assets/53515f45-4066-47fc-a6b8-df621a85ae33" />

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framework of library gebruikt? -->
### Loops
In mijn code gebruik ik een Liquid loop om alle cadeaus weer te geven op de pagina:
```
  {% for product in products %}
    {% if product.amount != '0.00' %}
      <article class="gift">
        <form method="post" action="/">
          {% if likedGifts contains product.id %}
            {% include 'partials/saved-button.liquid' %}
          {% else %}
            {% include 'partials/save-button.liquid' %}
          {% endif %}
        </form>
        <a href="/gift/{{ product.slug }}">
          <img class="product-image" src="{{ product.image }}" alt="">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">€{{ product.amount }}</p>
        </a>
      </article>
    {% endif %}
  {% endfor %}
```
Hier laat ik ook de cadeaus weg die een prijs van €0.00 heeft.

### Partials
Voor mijn website gebruik ik een partial voor de header, footer, buttons en ribbon zodat het op meerdere pagina's gebruikt kan worden:
```
{% include 'partials/head.liquid' %}
{% include 'partials/foot.liquid' %}

{% include 'partials/ribbon.liquid' %}

{% include 'partials/save-button.liquid' %}
{% include 'partials/saved-button.liquid' %}
```

### POST
Dit is de interactie van de POST:
<img width="1406" height="874" alt="Group 689" src="https://github.com/user-attachments/assets/c6eda9d6-29ff-4b20-b26e-490964181a07" />

Je klikt op deze button:
```
<button class="save-button" type="submit" name="id" value="{{ product.id }}">
  <img class="product-save-image" src="/assets/images/black-save-icon.svg" alt="">
</button>
```

Het wordt naar door dit endpoint gehaald en gestuurd naar de database:
```
app.post("/", async function (request, response) {
  await fetch(
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

  response.redirect(303, request.header("Referer") || "/");
});
```

Dan wordt het weer opgehaald uit de database om het op de wishlist-pagina weer te geven:
```
  {% for likedProduct in likedProducts reversed %}
    {% assign product = likedProduct.milledoni_products_id %}
    <article class="gift">
      <form method="post" action="/">
        {% include 'partials/saved-button.liquid' %}
      </form>
      <a href="/gift/{{ product.slug }}">
        <img class="product-image" src="{{ product.image }}" alt="">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">€{{ product.amount }}</p>
      </a>
    </article>
  {% endfor %}
```


## Installatie
<!-- Bij Installatie staat hoe een andere developer aan jouw repo kan werken -->


## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
