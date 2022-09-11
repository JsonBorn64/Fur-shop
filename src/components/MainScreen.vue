<template>
 <div class="wrapper">
    <img class="women_part1" src="../assets/images/general screen/Group 3.jpg" alt="women">
    <img class="women_part2" src="../assets/images/general screen/todd-kent-qWdIX3I5_BY-unsplash 1.jpg" alt="women">
    <img class="women_part3" src="../assets/images/general screen/todd-kent-qWdIX3I5_BY-unsplash 2.jpg" alt="women">
    <div class="decore_text1">
        <div>NEX</div>
        <div>TED</div>
    </div>
    <div class="decore_text2">Лучшие шубы в казахстане</div>
    <div class="decore_text3">
        <span>Fur </span>products
        <span>For </span>stylish cats
    </div>
    <div class="btn">Посмотреть каталог</div>
 </div>
</template>
  
<script>
export default {}
</script>

<style lang="scss" scoped>
    .wrapper {
        display: flex;
        margin-top: 86px;
        position: relative;
        margin-right: 102px;
    }

    .women_part2 {
        position: absolute;
        top: 132px;
        right: -202px;
    }

    .women_part3 {
        position: absolute;
        top: 317px;
        right: -292px;
    }

    .decore_text1 {
        font-family: 'Druk Cyr';
        font-weight: 500;
        font-size: 200px;
        line-height: 254px;
        text-transform: uppercase;
        color: #222;
        display: flex;
        position: absolute;
        top: 36px;
        left: -194px;
        div:last-child {
            color: #F8F8F8;
        }
    }

    .decore_text2 {
        font-family: 'Montserrat';
        font-weight: bold;
        font-size: 20px;
        line-height: 24px;
        text-align: right;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #222222;
        position: absolute;
        max-width: 175px;
        top: 295px;
        left: -181px;
    }

    .decore_text3 {
        font-family: 'Druk Cyr';
        font-weight: 500;
        font-size: 48px;
        line-height: 61px;
        text-transform: uppercase;
        max-width: 224px;
        position: absolute;
        top: 497px;
        right: -175px;
        span {
            color: #F8F8F8;
        }
    }

    .btn {
        position: absolute;
        width: 244px;
        height: 70px;
        left: -100px;
        bottom: -40px;
        background: #F5ED2A;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
        font-family: 'Montserrat';
        font-weight: bold;
        font-size: 15px;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        display: grid;
        place-content: center;
        cursor: pointer;
    }
</style>
  