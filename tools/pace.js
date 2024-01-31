// pace is in seconds/mi
let pace = 0;

const km = (dist) => dist * 0.621371192;
const mi = (dist) => dist;
const hr_min_sec = (hr, min, sec) => hr * 60 * 60 + min * 60 + sec;
const to_hr_min_sec = (seconds, pacefmt) => {
    const hr = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    if (pacefmt) {
        return `${String(hr * 60 + min).padStart(2, '0')}"${String(sec).padStart(2, '0')}'`
    }

    return `${hr}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

const paceInput = document.querySelector(".pace-input")

const distances = [
    {
        el: document.querySelector(".time-input-1M"),
        dist: mi(1),
    },
    {
        el: document.querySelector(".time-input-5K"),
        dist: km(5),
    },
    {
        el: document.querySelector(".time-input-4M"),
        dist: mi(4),
    },
    {
        el: document.querySelector(".time-input-5M"),
        dist: mi(5),
    },
    {
        el: document.querySelector(".time-input-10K"),
        dist: km(10),
    },
    {
        el: document.querySelector(".time-input-15K"),
        dist: km(15),
    },
    {
        el: document.querySelector(".time-input-10M"),
        dist: mi(10),
    },
    {
        el: document.querySelector(".time-input-12M"),
        dist: mi(12),
    },
    {
        el: document.querySelector(".time-input-20K"),
        dist: km(20),
    },
    {
        el: document.querySelector(".time-input-half"),
        dist: km(21.0975),
    },
    {
        el: document.querySelector(".time-input-15M"),
        dist: mi(15),
    },
    {
        el: document.querySelector(".time-input-20M"),
        dist: mi(20),
    },
    {
        el: document.querySelector(".time-input-marathon"),
        dist: km(42.195)
    }
]

const update = () => {
    if (document.activeElement != paceInput) paceInput.value = to_hr_min_sec(pace, true);
    distances.forEach(dist => {
        if (document.activeElement != dist.el) {
            dist.el.value = to_hr_min_sec(Math.round(pace * dist.dist))
        }
    })
}

distances.forEach((e, i)=> {
        distances[i].mask = IMask(distances[i].el, {
            mask: "0:00:00",
            lazy: false,
        })

        distances[i].mask.on('complete', (m) => {
            let times = distances[i].el.value.split(":").map((i) => parseInt(i));
            pace = Math.round(hr_min_sec(times[0], times[1], times[2]) / distances[i].dist);
            update();
        })
})

const paceInputMask = IMask(paceInput, {
    mask: "00'00\"",
    lazy: false,
});

paceInputMask.on('complete', (m) => {
    let times = paceInputMask.value.split("'")
    pace = hr_min_sec(0, parseInt(times[0]), parseInt(times[1].substring(0,2)));
    update();
})