import { Colony, IColony } from './Colony';
import { Player } from '../Player';
import { ColonyName } from './ColonyName';
import { Game } from '../Game';

export class Triton extends Colony implements IColony {
    public name = ColonyName.TRITON;
    public trade(player: Player, game: Game): void {
        this.beforeTrade(this, player);
        player.titanium += Math.max(this.trackPosition - 1, 1);
        this.afterTrade(this, player, game);
    }
    public onColonyPlaced(player: Player): undefined {
        super.addColony(this, player);
        player.titanium += 3;
        return undefined;
    }
    public giveTradeBonus(player: Player): void {
        player.titanium++;
    }    
}