export const formatPhone = (phone: string | number): string => {
  const str = phone.toString().replace(/\D/g, "")
  return str.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4")
}