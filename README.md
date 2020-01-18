# Projekt grafika 19/20 niestacjonarne
Konrad Mikucki, Patryk Waluś

## Użyte narzędzia
- implementacja w języku TypeScript
- budowanie przy pomocy Webpack

### Uruchomienie
Potrzebne do uruchomienia: node (https://nodejs.org/), yarn (https://yarnpkg.com/)

W terminalu: `yarn install` `yarn start`

## Obiekty
## Samochód (`Cybertruck`)
Sterowanie samochodem odbywa się klawiszami `WASD`

Fizyka jazdy zaimplementowana na podstawie
http://engineeringdotnet.blogspot.com/2010/04/simple-2d-car-physics-in-games.html 

Model samochodu:
https://sketchfab.com/3d-models/tesla-cybertruck-657e71b3e2ad468196668e9c9df708fb

## Oświetlenie i niebo (`Lighting.ts`)
Poza dodaniem świateł, wykorzystana została klasa `Sky` dostępna w Three.js.
## Nawigacja (`Navigation.ts`)
Kamera pozostaje w miejscu, podąża za samochodem.
Wykorzystane zostały `OrbitControls`
## Budynki (`Buildings`)
Załadowany model budynków (`Buildings/model.fbx`)
## Podłoże (`Ground`)
Wykorzystana została tekstura https://cc0textures.com/view?tex=Asphalt09
