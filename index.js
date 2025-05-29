import { TELEGRAM_CONFIGS } from "./config.js";

async function sendTelegramMessage(message) {
  for (const config of TELEGRAM_CONFIGS) {
    const url = `https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
      chat_id: config.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML",
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.ok) {
        console.error("Telegram Error:", data.description);
      } else {
        console.log(
          `✅ Message sent to ${config.TELEGRAM_CHAT_ID} at`,
          new Date().toLocaleTimeString()
        );
      }
    } catch (err) {
      console.error("❌ Telegram send error:", err.message);
    }
  }
}

async function checkTicketStatus() {
  try {
    const res = await fetch(
      "https://www.district.in/gw/consumer/events/v1/event/getBySlug/tata-ipl-2025-finals-match-in-ahmedabad-june03?tagSummaryView=true",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,ar;q=0.8",
          "cache-control": "no-cache",
          platform: "district_web",
          pragma: "no-cache",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-app-type": "ed_web",
          "x-device-id": "b10ecfae-577f-463c-b238-de480d1c229f",
          cookie:
            'cachedCity=online; skip_online_overlay=true; _ga=GA1.1.292692968.1747757879; _fbp=fb.1.1747757926697.461035043476899606; WZRK_G=f660c0591f44435c9f0a065c92b743f1; _gcl_au=1.1.2062573413.1747757879.1693333253.1748270559.1748270559; x-device-id=b10ecfae-577f-463c-b238-de480d1c229f; x-access-token=1748462838959809779_282813352318193738_227c05d899161a9d9d357d8ec10648948937159356472dc4ce4cc79587eca6b6; x-refresh-token=1748462838959814409_4408752164349763956_b439ca0f7d75117e75f4d0db114deeecb9be5bbd50917795034dc0906b0da92f; location=%7B%22fullname%22%3A%22International%20Tech%20Park%20Gurgaon%2CGolf%20Course%20Ext%20Rd%2C%20Alahawas%2C%20Sector%2059%2C%20Gurugram%2C%20Haryana%2C%20India%22%2C%22google_place_id%22%3A%22ChIJuyrrMJMhDTkRekt_0twP-C8%22%2C%22lat%22%3A28.4080424%2C%22long%22%3A77.1165992%2C%22subtitle%22%3A%22Haryana%22%2C%22title%22%3A%22Gurugram%22%2C%22id%22%3A1%2C%22cityId%22%3A1%2C%22cityName%22%3A%22Delhi%20NCR%22%2C%22pCityId%22%3A%2257%22%2C%22pCityKey%22%3A%22gurgaon%22%2C%22pCityName%22%3A%22Gurugram%22%2C%22pStateKey%22%3A%22haryana%22%2C%22pStateName%22%3A%22Haryana%22%7D; AKA_A2=A; ak_bmsc=038AFC2D339E4A01CEA028C8CB41423D~000000000000000000000000000000~YAAQvIosMafGYQGXAQAAjQPXGxtvfYcPIln8BfXuJEllGVL/lTaVdXxuh5q7Tch1ZqLwQjWOarDgcw5TY4JBQKB64BSQeIGq993OUwd4ihkTkA4qOXl0elsk+qj/dq93mhv14jbx8Dyva6Mv9kLRqneAAVNtaUOObNgKVJU8aZMmq0c1bIuHtnwVrfudSO/NXA1IlMzGq8X2vl9DHqA4YP1R5ASn+fmMsfcl14KV1aXYGO3/Cbl1X8kaXSW9gSoJKiGjazKSXvKLiAJ0IBiEhQUi9NIculir6T2eyh+Kd9cps3rZV4vZL/RrksMNexRuvFeBA5QGKTsTxSNMbfQVWVuCRELGJr3ZWa6X4P62YTToQzT3sE2yg2WnsoXfcJZEiE1kRlF6ZB9NZ2tHRAnYGy2bVZh5w1G0vSE=; _ga_WDEHDQ2ZK7=GS2.1.s1748522099$o16$g1$t1748522146$j13$l0$h1052888354; _ga_KHRD29M2W7=GS2.1.s1748522099$o16$g1$t1748522146$j13$l0$h1268643811; _dd_s=logs=1&id=38864e34-1e0d-4aa2-a043-a5755efad98d&created=1748522097352&expire=1748523049797&rum=2; RT="z=1&dm=www.district.in&si=18df3a20-3a44-49d0-9444-6cd9a914cc86&ss=mb9cx8o1&sl=0&tt=0"; bm_sv=B034238158CB3EBBDDEAE158009E3C7B~YAAQvIosMSyKkAGXAQAA66wKHBsl0DNlB+pDktpJ71jGyfoNoxL7yw0dlZRSvJYtSI7Cgmgt935si8cCm2R3LiQEsw47nUfLfbySp2A2+rcD1ms6pQDgSoDNxu+feU855d+zQ0ouozQC+60TIDmeATAWNRPMyNnpyTtU+HY4TsK7WC7DlvEJD2QusYBDipgI4ci5byNCB62+TxACay9jAVVzA0O9q2yfa46LfRz+OevI5pB7exKkAMWnygA1Ziq4FfI=~1',
          Referer:
            "https://www.district.in/events/tata-ipl-2025-finals-match-in-ahmedabad-june03-buy-tickets",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      }
    );

    const json = await res.json();
    const sales = json?.data?.sales;

    if (!Array.isArray(sales) || sales.length === 0) {
      console.warn("⚠️ No sales data found.");
      return;
    }

    const lastSale = sales[sales.length - 1];
    const status = lastSale.status;
    console.log(`[${new Date().toLocaleTimeString()}] Last status: ${status}`);

    if (status !== "coming_soon") {

    const currentDate = new Date().toLocaleString(); // or use .toISOString() for full format
    const msg = `🎟️ <b>Ticket Status Changed!</b>

<b>Title:</b> ${lastSale.title}
<b>Status:</b> ${status}
<b>Subtitle:</b> ${lastSale.subtitle}
<b>Checked At:</b> ${currentDate}`;

    await sendTelegramMessage(msg);
    }
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    await sendTelegramMessage(err.message);
  }
}

// Run immediately
checkTicketStatus();

// Run every 30 seconds
setInterval(checkTicketStatus, 30 * 1000);
