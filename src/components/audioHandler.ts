import {Howl, Howler} from 'howler';

export const AudioState = {
    Shoot: new Howl({
        src: '/assets/audio/shoot.wav',
        html5: true,
        preload: true,
    }),

    Death: new Howl({
        src: '/assets/audio/death.wav',
        html5: true,
        preload: true
    }),

    PlayerHit: new Howl({
        src: '/assets/audio/playerHit.wav',
        html5: true,
        preload: true,
        volume: 0.5
    })
}
