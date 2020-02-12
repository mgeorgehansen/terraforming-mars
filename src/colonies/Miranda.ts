import { Colony, IColony } from './Colony';
import { Player } from '../Player';
import { ColonyName } from './ColonyName';
import { Resources } from '../Resources';
import { Game } from '../Game';

export class Miranda extends Colony implements IColony {
    public name = ColonyName.IO;
    public trade(player: Player, game: Game): void {
        this.beforeTrade(this, player);
        if (this.trackPosition === 1 || this.trackPosition === 6) {
            player.heat += (this.trackPosition * 2) + 1;
        } else {
            player.heat += (this.trackPosition * 2);
        }    
        this.afterTrade(this, player, game);
    }
    public onColonyPlaced(player: Player): undefined {
        super.addColony(this, player);
        player.setProduction(Resources.HEAT);
        return undefined;
    }
    public giveTradeBonus(player: Player, game: Game): void {
        player.cardsInHand.push(
            game.dealer.dealCard());
    }    
}