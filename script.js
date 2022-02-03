const trains = [];

let form = document.querySelector('.form');
let vagonForm = document.querySelector('.vagon_form');

form.addEventListener('submit', function (event){
    event.preventDefault();
    trainInfoCreate();
    console.log(trains);
})

vagonForm.addEventListener('submit', function (event){
    event.preventDefault();
    vagonForm.classList.toggle('none');
})

function addWagon(obj){
    vagonForm.classList.toggle('none');
    let wagonNum = document.querySelector('.num_vagon').value;
    let wagonType = document.querySelector('.type_vagon').value;
    let people = document.querySelector('.people').value;
    console.log(obj)
    obj.addWagon({type: wagonType, num: wagonNum, people: people})
}

function createTrainsTablo(obj) {
    let trains = document.querySelector('.trains');
    let wraper = document.createElement('wrapper');
    let num = document.createElement('div');
    let privod = document.createElement('div');
    let type = document.createElement('div');
    let wagons = document.createElement('div')
    let removeTrainBtn = document.createElement('button');
    removeTrainBtn.setAttribute('class', 'remove');
    removeTrainBtn.innerText = 'Remove';
    removeTrainBtn.addEventListener('click', function (){
        console.log(this.parentElement);
        removeTrain(obj.getNumber());
        this.parentElement.remove();
    })

    wagons.addEventListener('click', function (){
        addWagon(obj);
    })

    num.innerText = obj.getNumber();
    privod.innerText = obj.getPrivod();
    type.innerText = obj.getType();
    wagons.innerText = obj.getWagon().length;

    wraper.appendChild(num);
    wraper.appendChild(privod);
    wraper.appendChild(type);
    wraper.appendChild(wagons);
    wraper.appendChild(removeTrainBtn);

    trains.appendChild(wraper);
}





function removeTrain(num) {
    let index = -1
    trains.map((train, i) => {
        if(train.getNumber() == num){
            index = i
        }
    })

    if (index != -1 && index >= 0){
        trains.splice(index, 1);
    }
}

function trainInfoCreate() {
    let number = document.querySelector('.number');
    let privodType = document.querySelector('.pryvod').value;
    let type = document.querySelector('.type').value;

    for (let train of trains){
        if(train.getNumber() == number.value) {
            let elem = document.querySelector('.err')
            elem.classList.toggle('none')

            setTimeout(function () {
                elem.classList.toggle('none')
            }, 1000)
            return;
        }
    }

    let train = new Train(number.value, privodType, type);

    trains.push(train);
    createTrainsTablo(train)
}

function Train(number, privod, type){
    this.number = number;
    this.privod = privod;
    this.type = type;
    this.wagon = [];
    this.startPoint = '';
    this.finish = '';
    this.stopPoint = [];

    this.getNumber = function (){
        return this.number;
    }

    this.getPrivod = function (){
        return this.privod;
    }

    this.getType = function (){
        return this.type;
    }

    this.getWagon = function (){
        return this.wagon;
    }

    this.setDeparture = function (startPoint){
        if (!this.wagon.length) return
        this.startPoint = startPoint;
    }

    this.removeDeparture = function (){
        this.startPoint = '';
    }

    this.setArrival = function (finish){
        if (!this.wagon.length) return
        this.finish = finish;
    }

    this.removeArrival = function (){
        this.finish = '';
    }

    this.setStops = function (stops){
        if (!this.startPoint || !this.finish) return
        if ((typeof stops) != 'string') {
            stops.map(item => {
                if (!this.stopPoint.includes(item)) {
                    this.stopPoint.push(item)
                }
            })
        }else{
            if (!this.stopPoint.includes(stops)){
                this.stopPoint.push(stops)
            }
        }
    }

    this.clearStops = function (){
        this.stopPoint = [];
    }

    this.removeStops = function (stop){
        let index = this.stopPoint.indexOf(stop);
        if (index >= 0){
            this.stopPoint.splice(index, 1)
        }
    }

    this.addWagon = function (wagon){ //{type: 'CUP', num: 1, people: 24}
        for (let key in this.wagon){
            if(this.wagon[key].num == wagon.num) return
        }
        this.wagon.push(wagon)
    }

    this.removeWagon = function (wagonNumber){
        let index = -1;
        this.wagon.map((item, i) => {
            if(item.num == wagonNumber){
                index = i;
            }
        })

        if(index != -1 && index >= 0){
            this.wagon.splice(index, 1);
        }
    }

    // this.showWagon = function (){
    //     return this.wagon.map(item => `Type: ${item.type};
    //     People: ${item.people};
    //     Number: ${item.num};\n`)
    // }

    // this.show = function (){
    //     console.log(`
    //         Number: ${this.number};
    //         Privod: ${this.privod};
    //         Type: ${this.type};
    //         Wagons: ${this.showWagon()};
    //         Departure: ${this.startPoint};
    //         Arrival: ${this.finish};
    //         Stops: ${this.stopPoint}
    //     `)
    // }
}




