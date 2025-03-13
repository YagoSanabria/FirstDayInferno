import SalaBase from "../scenes/salaBase.js";
import Player from "../gameObjects/characters/player.js";


export default class HallMedicina extends SalaBase {

    constructor(key) {
        super({ key: 'hallMedicina' });
        this.bound1 = 548;
        this.bound2 = 280;
    }

    create(data){
        super.create(data);

        const map = this.make.tilemap({ key: 'hallmedicina' }); // Cargamos el mapa
        //Cargar tilesets
        const tileset1 = map.addTilesetImage('Interiors_free_16x16', 'Interior');
        const tileset2 = map.addTilesetImage('Room_Builder_free_16x16', 'Muebles');

        //Configurar capas
        const layer1 = map.createLayer('suelo', [tileset1, tileset2], 0, 0);
        const layer2 = map.createLayer('pared', [tileset1, tileset2], 0, 0);
        const layer3 = map.createLayer('bordes', [tileset1, tileset2], 0, 0);
        const layer4 = map.createLayer('objetos', [tileset1, tileset2], 0, 0);
        const layer5 = map.createLayer('sin colision', [tileset1, tileset2], 0, 0);
    

        layer2.setCollisionByExclusion([-1], true);
        layer3.setCollisionByExclusion([-1], true);
        layer4.setCollisionByExclusion([-1], true);

        this.bulletGroup = this.physics.add.group();
        this.player = new Player(this, data.x, data.y, data.playerData);//831, 240

        //Colisiones
        this.physics.add.collider(this.player, layer2);
        this.physics.add.collider(this.bulletGroup, layer2, this.onBulletCollision);

        this.physics.add.collider(this.player, layer3);
        this.physics.add.collider(this.bulletGroup, layer3, this.onBulletCollision);

        this.physics.add.collider(this.player, layer4);
        this.physics.add.collider(this.bulletGroup, layer4, this.onBulletCollision);

        //Camaras
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(1.8);

    }
}