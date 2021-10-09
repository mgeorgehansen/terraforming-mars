import {expect} from 'chai';
import {Cyanobacteria} from '../../../src/cards/pathfinders/Cyanobacteria';
import {Game} from '../../../src/Game';
import {TestPlayer} from '../../TestPlayer';
import {TestPlayers} from '../../TestPlayers';
import {TestingUtils} from '../../TestingUtils';
import {AndOptions} from '../../../src/inputs/AndOptions';
import {GHGProducingBacteria} from '../../../src/cards/base/GHGProducingBacteria';
import {Tardigrades} from '../../../src/cards/base/Tardigrades';
import {Ants} from '../../../src/cards/base/Ants';

describe('Cyanobacteria', function() {
  let card: Cyanobacteria;
  let player: TestPlayer;
  let ghgProducingBacteria: GHGProducingBacteria;
  let tardigrades: Tardigrades;
  let ants: Ants;

  beforeEach(function() {
    card = new Cyanobacteria();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
    ghgProducingBacteria = new GHGProducingBacteria();
    tardigrades = new Tardigrades();
    ants = new Ants();
    TestingUtils.maxOutOceans(player);
  });

  it('play -- the simple part', function() {
    expect(player.game.getOxygenLevel()).eq(0);

    const options = card.play(player);

    expect(player.game.getOxygenLevel()).eq(1);
    expect(options).is.undefined;
  });

  it('play, one microbe card', function() {
    player.playedCards = [ghgProducingBacteria];
    const options = card.play(player);
    expect(options).is.undefined;
    // 9 oceans, so, maxed out.
    expect(ghgProducingBacteria.resourceCount).eq(9);
  });

  it('play, many microbe cards', function() {
    player.playedCards = [ghgProducingBacteria, tardigrades, ants];

    const options = card.play(player);

    expect(options).instanceOf(AndOptions);
    expect(options?.options.length).eq(3);

    options?.options[0].cb(1);
    options?.options[1].cb(3);
    options?.options[2].cb(5);
    options?.cb();

    expect(ghgProducingBacteria.resourceCount).eq(1);
    expect(tardigrades.resourceCount).eq(3);
    expect(ants.resourceCount).eq(5);
  });

  it('play, many microbe cards, wrong input', function() {
    player.playedCards = [ghgProducingBacteria, tardigrades, ants];

    const options = card.play(player);

    expect(options).instanceOf(AndOptions);
    expect(options?.options.length).eq(3);

    options?.options[0].cb(1);
    options?.options[1].cb(3);
    options?.options[2].cb(6);
    expect(() => options?.cb()).to.throw(/Expecting 9 microbes, got 10/);

    options?.options[2].cb(4);
    expect(() => options?.cb()).to.throw(/Expecting 9 microbes, got 8/);
  });
});
