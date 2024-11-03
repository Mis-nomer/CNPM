export const formatNumber = (number: number) => {
  let [integerPart, decimalPart] = number.toString().split('.')

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return decimalPart ? `${integerPart}.${decimalPart}` + 'VND' : integerPart + 'VND'
}
