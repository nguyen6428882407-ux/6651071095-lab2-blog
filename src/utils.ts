// 1. Định dạng tiền tệ
export function formatCurrency(amount: number, currency: string = 'VND'): string {
  const formattedNumber = new Intl.NumberFormat('vi-VN').format(amount);
  return `${formattedNumber} ${currency}`;
}

// 2. Cắt ngắn văn bản
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

// 3. Kiểm tra định dạng email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 4. Hàm debounce xử lý sự kiện
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounced = function (this: unknown, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };

  return debounced as T;
}