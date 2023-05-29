<?php

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$email = $data['email'];
$tel = $data['tel'];
$country = $data['country'];
$city = $data['city'];
$street = $data['street'];
$number = $data['number'];
$apart = $data['apart'];
$zip = $data['zip'];
$comment = $data['comment'];
$payMethod = $data['payMethod'];
$items = $data['items'];
$totalPrice = $data['totalPrice'];
$currentDate = date("d.m.Y");
$url = 'http://' . $_SERVER['HTTP_HOST'];

$to = "xaker6444@gmail.com, $email";
$subject = 'Ваш заказ из магазина шуб Nexted';
$headers = "From: Магазин шуб Nexted <furs@shop.com>\r\nReply-To: <furs@shop.com>\r\nContent-Type: text/html; charset=utf-8\r\n";
$body = "
<!doctype html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset='utf-8'>
    <script async src='https://cdn.ampproject.org/v0.js'></script>
    <style amp4email-boilerplate>body{visibility:visible}</style>
    <style amp-custom>
      /* Общие стили */
      body {
        font-family: Arial, sans-serif;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      td, th {
        border: 1px solid #ccc;
        padding: 8px;
      }
      /* Стили для шапки */
      .header {
        background-color: #f5f5f5;
      }
      .header h1 {
        margin: 0;
        padding: 20px;
        text-align: center;
        font-size: 24px;
        font-weight: normal;
      }
      /* Стили для основного содержимого */
      .main {
        padding: 20px;
      }
      .main h2 {
        margin: 0 0 20px 0;
        font-size: 18px;
        font-weight: normal;
      }
      .main p {
        margin: 0 0 10px 0;
        font-size: 14px;
      }
      .main .info {
        margin: 20px 0;
      }
      .main .info td {
        vertical-align: top;
      }
      .main .info td:first-child {
        font-weight: bold;
        width: 150px;
      }
      /* Стили для таблицы с товарами */
      .products {
        margin: 20px 0;
      }
      .products th {
        text-align: left;
      }
      .products td {
        text-align: right;
      }
      .products td:first-child {
        text-align: left;
      }
      .products .total td {
        font-weight: bold;
      }
      /* Стили для футера */
      .footer {
        background-color: #f5f5f5;
        padding: 20px;
      }
      .footer p {
        margin: 0;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class='header'>
      <h1>Ваш заказ из интернет-магазина шуб <a href='$url'>Nexted</a></h1>
    </div>
    <div class='main'>
      <h2>Детали заказа</h2>
      <table class='info'>
        <tr>
          <td>Номер заказа:</td>
          <td>#123456</td>
        </tr>
        <tr>
          <td>Дата заказа:</td>
          <td>$currentDate</td>
        </tr>
        <tr>
          <td>Способ оплаты:</td>
          <td>$payMethod</td>
        </tr>
        <tr>
          <td>Статус заказа:</td>
          <td>Ожидает подтверждения</td>
        </tr>
      </table>
      <h2>Информация о клиенте</h2>
      <table class='info'>
        <tr>
          <td>Имя:</td>
          <td>$name</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>$email</td>
        </tr>
        <tr>
          <td>Телефон:</td>
          <td>$tel</td>
        </tr>
        <tr>
          <td>Страна:</td>
          <td>$country</td>
        </tr>
        <tr>
          <td>Город:</td>
          <td>$city</td>
        </tr>
        <tr>
          <td>Адрес:</td>
          <td>ул. $street, $number, кв. $apart</td>
        </tr>
        <tr>
          <td>Почтовый индекс:</td>
          <td>$zip</td>
        </tr>
        <tr>
          <td>Комментарий:</td>
          <td>$comment</td>
        </tr>
      </table>
      <h2>Товары в заказе</h2>
      <table class='products'>
        <tr>
          <th>Название</th>
          <th>Количество</th>
          <th>Цена</th>
          <th>Сумма</th>
        </tr>
";

foreach ($items as $item) {
  $body .= "
    <tr>
        <td>".$item['Name']."</td>
        <td>1</td>
        <td>".$item['Price']." тн.</td>
        <td></td>
    </tr>
";
} 

$body .="
    <tr class='total'>
          <td colspan='3'>Итого:</td>
          <td>$totalPrice тн.</td>
        </tr>
      </table>
      </div>
      <div class='footer'>
        <p>Спасибо за ваш заказ!</p>
        <p>С уважением,<br> <a href='$url'>Интернет-магазин шуб Nexted</a></p>
      </div>
    </body>
  </html>
";

mail($to, $subject, $body, $headers);