export function formatRupiah(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? '-' : '';
  const digits = Math.abs(rounded).toString();
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${sign}Rp${grouped}`;
}

export function formatPriceRange(from: number, to?: number): string {
  if (typeof to === 'number' && to > from) {
    return `${formatRupiah(from)} – ${formatRupiah(to)}`;
  }
  return `mulai ${formatRupiah(from)}`;
}
