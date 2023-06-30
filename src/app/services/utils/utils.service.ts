import { Injectable } from '@angular/core';

export function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
export async function fetchJson(url: string) {
  return await (await fetch(url)).json();
}


export function timePassed(seconds) {
  let MINUTE = 60;
  let HOUR = MINUTE * 60;
  let DAY = HOUR * 24;
  let MONTH = DAY * 30;
  let months = Math.round(seconds / MONTH);
  let days = Math.round(seconds / DAY);
  let hours = Math.round(seconds / HOUR);
  let minutes = Math.round(seconds / MINUTE);
  if (months == 1) return `${months} Monat`;
  else if (months >= 1) return `${months} Monate`;
  else if (days == 1) return `${days} Tag`;
  else if (days >= 1) return `${days} Tage`;
  else if (hours > 0) return `${hours} Std.`;
  else if (minutes > 0) return `${minutes} Min.`;
  else return `${seconds} Sekunden`;
}

export function getDateTime()
{
  let dateTime = new Date();
  return dateTime
}