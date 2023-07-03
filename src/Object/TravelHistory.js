import { Time } from "../systems/time/time"


export class TravelHistory {
    constructor() {
        this.position_past = []
    }

    push_posi(posi) {
        this.position_past.push({
            posi,
            time: Time.get_timeGame(),
        })
        // console.log(posi.x + " " + posi.z + "    " + Time.get_timeGame());
    }

    getByDelayTime(args) {
        var i = this.position_past.length - 1;
        var delayTime = 0;
        args.forEach((element) => {
            delayTime += 1
            while (i >= 0 && this.position_past[i].time > Time.get_timeGame() - delayTime) {
                i--;
            }
            if (i < 0) {
                // rs.push(rs[rs.length - 1])
                element.setLocalPosition(this.position_past[this.position_past.length - 1].position)
            } else {
                // rs.push(this.position_past[i].position)
                element.setLocalPosition(this.position_past[i].position)
            }

            // console.log(element.getLocalPosition());
            // console.log(i);
        });

        // console.log(i + " ------------");
        // if (i != -1) {
        //     console.log(this.position_past.length - 1 + " " + i);
        //     console.log(this.position_past[this.position_past.length - 1].position.z + " " + this.position_past[i].position.z);

        // }

    }

    reset_position() {
        this.position_past = [];
    }
}