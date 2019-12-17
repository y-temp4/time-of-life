function $ (selector) {
  return document.querySelector(selector);
}

function calcurate() {
  var
    // 寿命（デフォルトで80歳、50~130歳で変動可能）
    lifespan = $('.lifespan').value - 0,
    // ユーザーの年齢（3~130歳で変動可能）
    age = $('.age').value - 0,
    // 結果を格納して表示するためのDOM
    result = $('.result'),
    // 体感時間での年齢
    feeling_age = Math.round( Math.log( age ) * 100 ),
    // 体感時間での年齢を寿命まで合計したもの
    feeling_lifespan = Math.round( Math.log( lifespan ) * 100 ),
    // 体感時間で、人生があとどれだけ残っているかという割合
    rest_ratio,
    // プログレスバーを伸ばすために値を格納
    value = feeling_age,
    // プログレスバーが伸びる時間を制御
    time = ( 1000 / feeling_lifespan ) * 5,
    // プログレスバーを格納する
    progress_bar,
    ratio_box,
    rest_ratio_box,
    loading,
    animate;

  rest_ratio = 100 - Math.round( feeling_age / feeling_lifespan * 100 );

  result.innerHTML
    = '<p>'
      + 'あなたは現在、体感時間で人生の'
      + '<span class="bold">'
        + '<output class="ratio">0</output>' + '%'
      + '</span>'
      + 'を過ごしました。'
    + '</p>'
    + '<p>'
      + 'のこりは'
      + '<span class="bold">'
        + '<output class="rest-ratio">0</output>' + '%'
      + '</span>'
      + 'です。'
    + '</p>'
      + '<progress value="0" max="'  + feeling_lifespan + '" class="progress-bar"></progress>'

      // JavaScriptの読み込みに失敗？したため
      // URLパラメータを用いてツイートする実装に変更
      + '<a href="https://twitter.com/intent/tweet'
      + '?url=' + encodeURIComponent('https://y-temp4.github.io/time-of-life/')
      + '&text=' + encodeURIComponent('体感時間だと、私の人生は残り')
      + rest_ratio
      + encodeURIComponent('％です。')
      + '&hashtags=timeoflife'
      + '&via=y_temp4"'
      + '&related=y_temp4" class="twitter-button">'
      + '結果をツイートする</a>';

  progress_bar = $('.progress-bar');
  ratio_box = $('.ratio');
  rest_ratio_box = $('.rest-ratio');

  loading = function() {
    progress_bar.value += 1;
    // この計算をすることによって、体感時間での人生の割合（ratio）を
    // loadingでいい感じに増加させることができる
    ratio_box.value = Math.round( ( progress_bar.value - 0 ) / feeling_lifespan * 100 );
    rest_ratio_box.value = 100 - ratio_box.value;

    if ( progress_bar.value == feeling_age ) {
      clearInterval(animate);
    }
  };

  animate = setInterval( function() {
    loading();
  }, time);

  return false;
}

function init() {
  $('.form').onsubmit = calcurate;
}
// window.onloadよりは新しい方法らしい
document.addEventListener( 'DOMContentLoaded', init, false );
