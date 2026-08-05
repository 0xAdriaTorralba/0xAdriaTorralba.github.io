import { Card } from "./Card.js";

export const DeckState = { INTRO: 0, SPREAD: 1, FOCUS: 2, CAROUSEL: 3 };

export class Deck {
  constructor(projects, scene, { mobile = false } = {}) {
    this.cards = [];
    this.scene = scene;
    this.state = DeckState.INTRO;
    this.focusedIndex = -1;
    this.carouselIndex = 0;
    this._carouselOffset = 0;
    this.mobile = mobile;

    projects.forEach((proj, i) => {
      const card = new Card(proj, i);
      this.cards.push(card);
      scene.add(card.mesh);
    });

    this._layoutIntro();
    this._spreadTimer = setTimeout(
      () => this.transitionTo(mobile ? DeckState.CAROUSEL : DeckState.SPREAD),
      800,
    );
  }

  _layoutIntro() {
    // Stacked deck pile with slight offsets
    this.cards.forEach((card, i) => {
      card.mesh.position.set(i * 0.003, i * 0.003, i * 0.04);
      card.mesh.rotation.set(0, 0, (Math.random() - 0.5) * 0.02);
    });
  }

  _layoutSpread() {
    const n = this.cards.length;
    const arcSpan = Math.min(n * 0.55, 3.2); // total arc width
    const arcHeight = 0.15; // parabolic rise at center

    this.cards.forEach((card, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1); // 0..1
      const x = (t - 0.5) * arcSpan;
      const y = -arcHeight * Math.pow((t - 0.5) * 2, 2) + arcHeight;
      const z = i * 0.15; // enough Z gap to prevent clipping on tilt
      const rot = (t - 0.5) * -0.12; // slight fan rotation

      this._animateTo(card, { x, y, z, rotZ: rot }, i * 50);
    });
  }

  _layoutFocus(index) {
    this.cards.forEach((card, i) => {
      if (i === index) {
        this._animateTo(card, { x: -0.4, y: 0, z: 2.0, rotZ: 0, rotY: 0 }, 0);
      } else {
        const offset = i < index ? -1 : 1;
        const dist = Math.abs(i - index);
        this._animateTo(
          card,
          {
            x: offset * (1.5 + dist * 0.3),
            y: -0.2,
            z: -1.0,
            rotZ: offset * 0.1,
            opacity: 0.3,
          },
          dist * 30,
        );
      }
    });
  }

  _layoutCarousel(animate = true) {
    const spacing = 1.3;
    this.cards.forEach((card, i) => {
      const target = {
        x: (i - this.carouselIndex) * spacing,
        y: 0,
        z: i === this.carouselIndex ? 0.3 : 0,
        rotZ: 0,
        rotY: (i - this.carouselIndex) * -0.08,
      };
      if (animate) {
        this._animateTo(card, target, 0);
      } else {
        card.mesh.position.set(target.x, target.y, target.z);
        card.mesh.rotation.set(0, target.rotY, 0);
      }
      // Highlight current card
      card.targetHover = i === this.carouselIndex ? 0.6 : 0;
      card.targetDim = i === this.carouselIndex ? 0 : 0.5;
    });
  }

  carouselNav(dir) {
    this.carouselIndex = Math.max(0, Math.min(this.cards.length - 1, this.carouselIndex + dir));
    this._layoutCarousel();
  }

  setCarouselDragOffset(offset) {
    this._carouselOffset = offset;
  }

  _animateTo(card, target, delay) {
    const mesh = card.mesh;
    const start = {
      x: mesh.position.x,
      y: mesh.position.y,
      z: mesh.position.z,
      rotZ: mesh.rotation.z,
      rotY: mesh.rotation.y,
    };
    const duration = 700;
    const startTime = performance.now() + delay;

    card._anim = { start, target, startTime, duration };
  }

  transitionTo(state, focusIndex = -1) {
    this.state = state;
    this.focusedIndex = focusIndex;
    // Reset wobble base positions
    this.cards.forEach((c) => { c._spreadRotZ = null; c._spreadY = null; c._spreadX = null; c._spreadZ = null; });

    if (state === DeckState.SPREAD) {
      this._layoutSpread();
    } else if (state === DeckState.CAROUSEL) {
      this._layoutCarousel();
    } else if (state === DeckState.FOCUS) {
      this._layoutFocus(focusIndex);
    }
  }

  setThemeColor(hex) {
    this.cards.forEach((c) => c.setThemeColor(hex));
  }

  update(time, dt) {
    const now = performance.now();

    this.cards.forEach((card) => {
      card.update(time, dt);

      // Process position/rotation animation
      if (card._anim) {
        const { start, target, startTime, duration } = card._anim;
        let progress = (now - startTime) / duration;

        if (progress < 0) {
          // Delay not elapsed
          progress = 0;
        } else if (progress >= 1) {
          progress = 1;
          card._anim = null;
        }

        // Smoothstep easing
        const t = progress * progress * (3 - 2 * progress);

        card.mesh.position.x = start.x + (target.x - start.x) * t;
        card.mesh.position.y = start.y + ((target.y ?? start.y) - start.y) * t;
        card.mesh.position.z = start.z + ((target.z ?? start.z) - start.z) * t;
        card.mesh.rotation.z = start.rotZ + ((target.rotZ ?? start.rotZ) - start.rotZ) * t;
        card.mesh.rotation.y = (start.rotY || 0) + ((target.rotY ?? start.rotY ?? 0) - (start.rotY || 0)) * t;
      }

      // Carousel: apply live drag offset
      if (this.state === DeckState.CAROUSEL && !card._anim) {
        const spacing = 1.3;
        const baseX = (card.index - this.carouselIndex) * spacing;
        card.mesh.position.x = baseX + this._carouselOffset * spacing;
        // Wobble for carousel
        const seed = card.index * 1.7;
        card.mesh.position.y = Math.sin(time * 0.6 + seed * 1.3) * 0.01;
        card.mesh.rotation.x = Math.sin(time * 0.5 + seed) * 0.01;
      }

      // Idle wobble — continuous Balatro-style float, always active in SPREAD
      if (this.state === DeckState.SPREAD && !card._anim) {
        const seed = card.index * 1.7;
        if (card._spreadRotZ == null) {
          card._spreadRotZ = card.mesh.rotation.z;
          card._spreadY = card.mesh.position.y;
          card._spreadX = card.mesh.position.x;
          card._spreadZ = card.mesh.position.z;
        }
        // Visible float up/down
        card.mesh.position.y = card._spreadY + Math.sin(time * 0.6 + seed * 1.3) * 0.012;
        // Gentle horizontal drift
        card.mesh.position.x = card._spreadX + Math.sin(time * 0.4 + seed * 2.1) * 0.005;
        // Z lift when hovered — pop well in front of all cards
        card.mesh.position.z = card._spreadZ + card.lift * 1.2;
        // Tilt sway — only when not hovered (hover sets its own rotation)
        if (card.lift < 0.1) {
          card.mesh.rotation.x = Math.sin(time * 0.5 + seed) * 0.015;
          card.mesh.rotation.z = card._spreadRotZ + Math.sin(time * 0.35 + seed * 2.3) * 0.008;
        }
      }
    });
  }

  dispose() {
    clearTimeout(this._spreadTimer);
    this.cards.forEach((card) => {
      this.scene.remove(card.mesh);
      card.mesh.geometry.dispose();
      card.mesh.material.forEach((m) => m.dispose());
    });
  }
}
