const MYANMAR_DIGITS = /[၀၁၂၃၄၅၆၇၈၉]/g
const DIGIT_MAP = { "၀": "0", "၁": "1", "၂": "2", "၃": "3", "၄": "4", "၅": "5", "၆": "6", "၇": "7", "၈": "8", "၉": "9" }

export function normalizeDigits(value) {
  return value.replace(MYANMAR_DIGITS, (d) => DIGIT_MAP[d])
}
