export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9_.-]*$/;
export const ALPHA_REGEX = /^[a-zA-Z]*$/;
export const ALPHAS_REGEX = /^[a-zA-Z\s]*$/;
export const SINGLE_BYTE_KANA_REGEX = /^[｡｢｣､･ｦ-ﾟ]*$/i;
export const CURRENCY_REGEX = /[,￥\\]/g;
export const NUMBER_COMMA_REGEX = /\B(?=(\d{3})+(?!\d))/g;
export const NUMBER_REGEX = /^\d+$/;
export const ONLY_NUMBER_REGEX = /[^\d０-９]/g;
export const YEAR_REGEX = /^\d{4}$/;
export const NOT_NUMBER_REGEX = /[^0-9]/g;
export const NUMBER_REGEX_INCLUDE_NEGATIVE = /^([+-]|[+-]?[0-9]{1,9})((\.)|(?:\.[0-9]{1,9}))?$/;
export const COMMA_REGEX = /,/g;
export const MONEY_NEGATIVE_REGEX = /(-?\d+)(\d{3})/;
export const PARENTHESES_REGEX = /\(.*?\)/;
export const PHONE_NUMBER_REGEX = /^[0-9]{1,4}-[0-9]{1,4}-[0-9]{1,4}$/;
export const EMAIL_REGEX =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const FULL_WIDTH_ALPHAS = /^[Ａ-Ｚ]+$/;
export const EMAIL_NO_FULL_WIDTH_REGEX = /^[\w!#$%&'*+/=?^_{}\\|~-]+([\w!#$%&'*+/=?^_{}\\|~\\.-]+)*@([\w][\w-]*\.)+[\w][\w-]*$/;
export const EMAIL_NO_FULL_WIDTH_REGEX_NO_SPECIAL_CHAR =
  /^[\w!#$%&'*+/=?^_{}\\|~-]+([\w!#$%&'*+/=?^_{}\\|~\\.-]+)*[^\\.,;:]@([\w][\w-]*\.)+[\w][\w-]*$/;
export const REGEX_IS_TEXT_FULL_WIDTH =
  /^[ａ-ｚＡ-Ｚ０-９ぁ-んァ-ン一-龥！″＃＄％＆′（）＊＋，－．／：；＜＝＞？＠［￥］＾＿｀｛｜｝￣。「」、・ー゛゜]+$/;
export const MEMBER_CODE_REGEX = /^[\d]{8}$/;
