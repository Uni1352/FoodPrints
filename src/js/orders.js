function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}

function datetimeFormat(d) {
  const date = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
  const time = [d.getHours(), d.getMinutes(), d.getSeconds()];

  if (date[1] < 10) {
    date[1] = `0${date[1]}`;
  }
  if (date[2] < 10) {
    date[2] = `0${date[2]}`;
  }
  if (time[0] < 10) {
    time[0] = `0${time[0]}`;
  }
  if (time[1] < 10) {
    time[1] = `0${time[1]}`;
  }
  if (time[2] < 10) {
    time[2] = `0${time[2]}`;
  }

  return `${date.join('-')} ${time.join(':')}`;
}

function appendHistoryOrderItems(orders, idnum) {
  $.each(orders, (index, element) => {
    if (element.userID === parseInt(idnum, 10)) {
      const date = datetimeFormat(new Date(element.orderDate));
      $('tbody').append(`<tr>
          <td>${date}</td>
          <td>${element.items.foodName}</td>
          <td>${element.items.farmerName}</td>
          <td>${element.items.foodQuantity}</td>
          <td>${element.profit}</td>
        </tr>`);
    }
  });
}

function appendFinishedRoutes(routes, idnum) {
  $.each(routes, (index, element) => {
    if (element.farmerID === parseInt(idnum, 10)) {
      const date = datetimeFormat(new Date(element.date));
      $('tbody').append(`<tr>
          <td>${element.routeID}</td>
          <td>${date}</td>
          <td></td>
          <td>${element.totalProfit}</td>
        </tr>`);
    }
  });
}

function getOrders(type) {
  const userid = getCookie('userID');

  if (type === 'restaurant') {
    $.get('https://graduation.jj97181818.me/api/orders')
      .done((res) => {
        appendHistoryOrderItems(res, userid);
      })
      .fail(() => {
        alert('資料讀取失敗');
      });
  } else if (type === 'farmer') {
    $.get('https://graduation.jj97181818.me/api/routes')
      .done((res) => {
        appendFinishedRoutes(res.routes, userid);
      })
      .fail(() => {
        alert('資料讀取失敗');
      });
  }
}

$(document).ready(() => {
  const usertype = getCookie('userType');

  getOrders(usertype);
});