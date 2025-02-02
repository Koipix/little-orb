import {Howl, Howler} from 'howler';

export const AudioState = {
    Shoot: new Howl({
        src: '/assets/audio/shoot.wav',
        html5: true,
        preload: true
    })
}
