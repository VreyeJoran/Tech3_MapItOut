## Concept

Lunar Frontier is een interactieve 3D webervaring waarin de gebruiker een futuristische maanbasis kan verkennen.  
Het project combineert real‑time 3D‑graphics, physics en een dynamische user interface om een rustige maar technologisch geavanceerde wereld te creëren.

De gebruiker kan vrij navigeren rond de maanbasis, locaties selecteren en informatie bekijken via directe interactie of een live minimap.  
Daarnaast bevat de ervaring een rond rijdende maanrover animatie en een physics‑gebaseerde meteorietinteractie die de wereld extra dynamiek geeft.

Het project focust op het gevoel van exploratie, controle en aanwezigheid in een digitale ruimte.

---

## Technische aanpak

Lunar Frontier is opgebouwd als een web‑based 3D applicatie met moderne front‑end technologieën.

### Gebruikte technologieën

- **React** – algemene applicatiestructuur
- **React Three Fiber** – koppeling tussen React en Three.js
- **@react-three/drei** – helpers voor loaders, environment en UI
- **Rapier Physics** – real‑time physics simulatie
- **GSAP** – animaties en UI‑transities
- **Leva** – debugging en parametercontrole tijdens development
- **Blender** – modelleren van de 3D‑wereld en assets

---

## Interactie

De gebruiker kan:

- Interageren door locaties te selecteren in de 3D‑wereld
- Navigeren via een live minimap
- Informatie bekijken per locatie
- Een meteoriet laten inslaan via locatie‑gebaseerde interactie

---

## Assets & credits

### Eigen werk

De volgende modellen zijn volledig zelf gemaakt in Blender:

- Het maanoppervlak
- De maanhabitat:
  - de gang
  - de glazen koepel
  - het ronde gebouw
- De rakettoren
- Het lanceerplatform

### Externe modellen (Sketchfab)

- **Raket (SpaceX Starship)**  
  https://sketchfab.com/3d-models/spacex-starship-a8a0b69f776841a1a465cd9fb3762fd2

- **Rover (aangepast)**  
  https://sketchfab.com/3d-models/mars-rover-2-51650fa1c23c48818a05aa1ece9f712e  
  _Kleuren aangepast en onderdelen verwijderd._

- **Meteoriet / komeet**  
  https://sketchfab.com/3d-models/asteroid-d3b95b50c02a482d927f224b623bb83d

- **Gepotte planten**  
  https://sketchfab.com/3d-models/optimized-potted-plants-967b4bf23fac4098993776fcfc2d3318

- **Zonnepaneel**  
  https://sketchfab.com/3d-models/solar-panel-83483a66f8974d7e8f2e7bbde518d606

- **Satelliettoren**  
  Royalty‑free

### Textures & HDRI

- **Textures:**

  - AmbientCG
  - Poliigon  
    (allemaal royalty‑free)

- **HDRI:**
  - BlenderKit (royalty‑free)

### Audio

- **Achtergrondmuziek applicatie:**  
  _Morning Light_ — Epic Spectrum  
  Source: https://freetouse.com/music

- **Muziek promovideo:**  
  _Dawn_ — Alegend  
  Source: https://freetouse.com/music

- **Sound effects (klik & impact):**  
  Royalty‑free

Alle assets worden gebruikt voor **educatieve doeleinden**.

---

## Project lokaal runnen

### Vereisten

- **Node.js** (v18 of hoger aanbevolen)
- **npm**

### Installatie

```bash
npm install
npm run dev
```

De applicatie is daarna beschikbaar via:
http://localhost:5173
