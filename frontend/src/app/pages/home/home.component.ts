import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <section class="hero">
      <div class="hero-copy">
        <div class="brand-chip">
          <img src="assets/cars/logo-hotwheels.jpg" alt="Hot Wheels">
          <span>Stock curado para coleccionistas</span>
        </div>
        <p class="eyebrow">Autos coleccionables a escala</p>
        <h1>Garage de bolsillo, actitud de pista</h1>
        <p class="lead">Modelos Hot Wheels, JDM, clasicos y piezas de vitrina para elegir sin perderse entre cajas repetidas.</p>

        <div class="hero-stats">
          <span><strong>1:64</strong> blister diario</span>
          <span><strong>1:43</strong> vitrina chica</span>
          <span><strong>1:24</strong> display mediano</span>
        </div>
      </div>

      <div class="hero-gallery" aria-label="Autos destacados">
        <img src="assets/cars/Banner-6.webp" alt="Nuevos autos coleccionables">
        <img src="assets/cars/McLAREN W1 Naranja.webp" alt="McLaren W1 Naranja a escala">
        <img src="assets/cars/64' Chevy' CHEVELLE 55-Rojo.webp" alt="Chevy Chevelle rojo a escala">
      </div>
    </section>

    <section class="banner-strip">
      <img src="assets/cars/Banner-7.jpg" alt="Banner de nuevos ingresos Hot Wheels">
      <div>
          <p class="eyebrow">Nuevos ingresos</p>
          <h2>McLaren, Chevelle y supercars listos para repisa</h2>
          <p>Una vidriera rapida para encontrar escala, precio y stock antes de que el modelo desaparezca.</p>
      </div>
    </section>

    <section class="promo-grid">
      <article>
        <img src="assets/cars/banner-5.webp" alt="Banner promocional de autos a escala">
        <div>
          <span>Promo</span>
          <strong>Nuevas piezas para coleccionistas</strong>
        </div>
      </article>
      <article>
        <img src="assets/cars/McLAREN P1 Rojo.jpg" alt="McLaren P1 rojo">
        <div>
          <span>Hypercar</span>
          <strong>McLaren P1 Rojo</strong>
        </div>
      </article>
      <article>
        <img src="assets/cars/64' Chevy' CHEVELLE 55-Amarilla.webp" alt="Chevy Chevelle amarillo">
        <div>
          <span>Muscle</span>
          <strong>Chevelle SS 64</strong>
        </div>
      </article>
    </section>
  `,
  styles: []
})
export class HomeComponent {}
