<template>
    <section class="about_us" id="about_us">
        <div class="about_us-wrapper">
            <p>NEXTED - уже 12 лет радует своих покупателей роскошными шубами, элегантными жилетками, стильными куртками из натурального меха и лучшими условиями покупки. В NEXTED каждое изделие характеризуется удобным покроем, стильным и изящным видом, высокими эксплуатационными показателями, практичностью и долговечностью. В нашем салоне Вы найдёте меховые изделия разной категорий и для любого возраста: как для юной девушки, так и для взрослой женщины, поскольку размеры от самого маленького до самых больших.</p>
        <div>
            <h2 class="title">Немного о нас</h2>
            <p>В на­ших тер­ми­на­лах при­ни­ма­ют­ся пла­теж­ные сред­ства прак­ти­че­ски всех си­стем, вклю­чая Visa, Master Card, Maestro, Amex и др. Также принимаем карты Kaspi Red. Приходите примерить любое количество роскошных меховых изделий, попить чаю и получить консультации от наших специалистов по меховым изделиям.</p>
        </div>
        <p>В 2019, 2020, 2021 году Бренд NExted представил новую коллекцию на неделе моды Kazakhstan Fashion Week.  Коллекция сочетают в себе  красоту и комфорт, стиль и роскошь. В этом же году наш бренд был отмечен известной премией PEOPLE AWARDS, наградив главного дизайнера званием "дизайнер меховых и кожаных изделий года"</p>
        </div>
    </section>
    <section class="about_us-mobile">
        <div class="decore_line"></div>
        <div class="title-mobile">Немного <br> о нас</div>
        <div class="decore_group">
            <div class="rectangle"></div>
            <div class="line"></div>
            <p>
                NEXTED - уже 12 лет радует своих покупателей роскошными шубами, элегантными жилетками, стильными куртками из натурального меха и лучшими условиями покупки. В NEXTED каждое изделие характеризуется удобным покроем, стильным и изящным видом, высокими эксплуатационными показателями, практичностью и долговечностью. В нашем салоне Вы найдёте меховые изделия разной категорий и для любого возраста: как для юной девушки, так и для взрослой женщины, поскольку размеры от самого маленького до самых больших.
                В на­ших тер­ми­на­лах при­ни­ма­ют­ся пла­теж­ные прак­ти­че­ски всех си­стем, вклю­чая Visa, Master Card, Maestro, Amex и др. Также принимаем карты Kaspi Red. 
                Приходите примерить любое количество роскошных меховых изделий, попить чаю и получить консультации от наших специалистов по меховым изделиям.
            </p>
        </div>
        <p class="bottom_text">
            В 2019, 2020, 2021 году Бренд NExted представил новую коллекцию на неделе моды Kazakhstan Fashion Week.  Коллекция сочетают в себе  красоту и комфорт, стиль и роскошь. В этом же году наш бренд был отмечен известной премией PEOPLE AWARDS, наградив главного дизайнера званием "дизайнер меховых и кожаных изделий года"
        </p>
    </section>
</template>

<style lang="scss" scoped>

    .about_us {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .about_us-wrapper {
        margin-top: 164px;
        font-family: 'Montserrat';
        font-weight: bold;
        font-size: 15px;
        line-height: 21px;
        text-align: justify;
        letter-spacing: -0.02em;
        color: #222222;
        width: 100%;
        max-width: 929px;
        display: flex;
        flex-direction: column;
        > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: inherit;
        }
        .title {
            font-family: 'Druk Cyr';
            font-weight: 500;
            font-size: 64px;
            text-transform: uppercase;
            color: #222222;
            white-space: nowrap;
            margin-right: 10px;
            + p {
                max-width: 527px;
            }
        }
        p {
            max-width: 770px;
        }
    }

    .about_us-mobile {
        margin-top: 140px;
        display: none;
        flex-direction: column;
    }

    .decore_line {
        background: #F5ED2A;
        height: 8px;
    }
    .title-mobile {
        font-family: 'Druk Cyr';
        font-weight: 500;
        font-size: 64px;
        line-height: 67px;
        text-transform: uppercase;
        color: #222222;
        margin-bottom: 14px;
    }
    .decore_group {
        .rectangle {
            width: 71px;
            height: 211px;
            background: #F5ED2A;
            margin-left: 20px;
            margin-right: 25px;
            margin-top: 47.5px;
            float: left;
        }
        .line {
            width: 1px;
            height: 248px;
            background: #222222;
            margin-right: 17px;
            margin-top: 30px;
            float: left;
        }
        p {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 16px;
            line-height: 140.9%;
            letter-spacing: -0.02em;
            color: #222222;
        }
    }

    .bottom_text {
        margin-top: 14px;
        border: 4px solid #F5ED2A;
        text-align: center;
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 16px;
        line-height: 140.9%;
        letter-spacing: -0.02em;
        color: #222222;
        padding: 20px 6px;
    }

    @media (max-width: 840px) {
        .about_us {
            display: none;
        }
        .about_us-mobile {
            display: flex;
        }
    }

    @media (max-width: 530px) {
        .decore_group {
            p {
                font-size: 12px;
            }
        }
        .bottom_text {
            font-size: 12px;
        }
    }

</style>