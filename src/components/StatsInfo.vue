<template>
    <section class="stats">
        <div class="item">
            <div class="num">13</div>
            <div class="text">Филиалов по всей стране</div>
        </div>
        <div class="item">
            <div class="num">10</div>
            <div class="text">Лет на рынке</div>
        </div>
        <div class="item">
            <div class="num">20</div>
            <div class="text">Шуб продаём в день</div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .stats {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: flex-start;
        width: 100%;
        margin-top: 120px;
        .item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-width: 124px;
            margin: 0px 29px;
            @media (max-width: 569px) {
                margin: 30px 29px;
            }
            .num {
                width: 83px;
                height: 83px;
                background: #F5ED2A;
                display: grid;
                place-content: center;
                font-family: 'Druk Cyr';
                font-weight: 500;
                font-size: 64px;
                text-transform: uppercase;
                color: #222222;
                margin-bottom: 15px;
            }
            .text {
                text-align: center;
                font-family: 'Montserrat';
                font-weight: 700;
                font-size: 15px;
                line-height: 21px;
                letter-spacing: -0.02em;
                text-transform: uppercase;
                color: #222222;
            }
        }
    }
</style>