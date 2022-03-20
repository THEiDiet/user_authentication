export const getZodiac = (date) => {
  const dateArray = date.split('-')
  const [m,d] = [+dateArray[1],+dateArray[2]]
  if ((d >= 21 && m === 3) || (d <= 20 && m === 4)) return 'Овен'
  if ((d >= 21 && m === 4) || (d <= 20 && m === 5)) return 'Телец'
  if ((d >= 21 && m === 5) || (d <= 21 && m === 6)) return 'Близнецы'
  if ((d >= 22 && m === 6) || (d <= 22 && m === 7)) return 'Рак'
  if ((d >= 23 && m === 7) || (d <= 23 && m === 8)) return 'Лев'
  if ((d >= 24 && m === 8) || (d <= 23 && m === 9)) return 'Дева'
  if ((d >= 24 && m === 9) || (d <= 23 && m === 10)) return 'Весы'
  if ((d >= 24 && m === 10) || (d <= 22 && m === 11)) return 'Скорпион'
  if ((d >= 23 && m === 11) || (d <= 21 && m === 12)) return 'Срелец'
  if ((d >= 22 && m === 12) || (d <= 20 && m === 1)) return 'Козерог'
  if ((d >= 21 && m === 1) || (d <= 18 && m === 2)) return 'Водолей'
  else return 'Рыбы'
}
