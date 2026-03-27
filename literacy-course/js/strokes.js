/**
 * 笔顺教学：Hanzi Writer
 * 在线从 CDN 加载笔画数据（需网络）；失败时回退到 app.js 中的简易画布描红。
 */
(function (global) {
  'use strict';

  var demoWriter = null;
  var quizWriter = null;

  function getStrokeChar(lesson) {
    var t = lesson.text;
    if (!t || t.length === 0) return '一';
    if (t.length === 1) return t;
    return t.charAt(0);
  }

  /** 显式 HTTPS 加载笔顺 JSON，避免 file:// 打开时默认相对路径失败 */
  function charDataLoader(char) {
    var url = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/' + encodeURIComponent(char) + '.json';
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('char data ' + res.status);
      return res.json();
    });
  }

  function optsDemo() {
    return {
      width: 280,
      height: 280,
      padding: 10,
      showOutline: true,
      showCharacter: false,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 200,
      strokeColor: '#4a6fa5',
      radicalColor: '#7eb8da',
      outlineColor: '#e0e8f0',
      drawingColor: '#7eb8da',
      highlightColor: '#ffd966',
      highlightCompleteColor: '#5cbf6a',
      charDataLoader: charDataLoader,
    };
  }

  function optsQuiz() {
    return Object.assign({}, optsDemo(), {
      showCharacter: false,
      showOutline: true,
      highlightOnComplete: true,
      showHintAfterMisses: 2,
      /** 描红：加粗书写线，浅色虚影底稿更易看见 */
      drawingWidth: 14,
      outlineColor: '#c8d4e8',
      strokeColor: '#4a6fa5',
      drawingColor: '#5a8fd4',
    });
  }

  function setDisplay(id, on) {
    var el = document.getElementById(id);
    if (el) el.style.display = on ? 'block' : 'none';
  }

  /**
   * @param {object} lesson
   * @param {{ drawStrokeDemo: Function, setupTrace: Function }} fallbacks
   */
  function initLesson(lesson, fallbacks) {
    global.__literacyLesson = lesson;
    demoWriter = null;
    quizWriter = null;

    var ch = getStrokeChar(lesson);
    var noteEl = document.getElementById('strokeCharNote');
    if (noteEl) {
      noteEl.textContent = lesson.text.length > 1
        ? '本课为词语，笔顺以首字「' + ch + '」为例'
        : '';
    }

    var hintEl = document.getElementById('strokeFallbackNote');
    if (hintEl) {
      hintEl.style.display = 'none';
      hintEl.textContent = '';
    }

    var demoEl = document.getElementById('hanziDemo');
    var quizEl = document.getElementById('hanziQuiz');
    if (demoEl) demoEl.innerHTML = '';
    if (quizEl) quizEl.innerHTML = '';

    function fullFallback(msg) {
      if (hintEl) {
        hintEl.style.display = 'block';
        hintEl.textContent = msg || '无法加载笔顺数据，已使用简易描红（请检查网络或稍后重试）';
      }
      setDisplay('hanziDemo', false);
      setDisplay('hanziQuiz', false);
      setDisplay('strokeCanvas', true);
      setDisplay('traceCanvas', true);
      fallbacks.drawStrokeDemo(lesson);
      fallbacks.setupTrace(lesson);
    }

    if (!global.HanziWriter) {
      fullFallback('未加载 Hanzi Writer，请确认已引入脚本');
      return;
    }

    setDisplay('hanziDemo', true);
    setDisplay('hanziQuiz', true);
    setDisplay('strokeCanvas', false);
    setDisplay('traceCanvas', false);

    /**
     * Hanzi Writer 3.x：HanziWriter.create() 同步返回实例，不是 Promise。
     * 笔顺数据在 setCharacter 内异步加载；animateCharacter / quiz 内部会等 _withDataPromise。
     * 原先误用 .then(writer)，导致永远走 else：藏掉演示区且从未调用动画/描红测验。
     */
    var HW = global.HanziWriter;
    var demoW = HW.create('hanziDemo', ch, optsDemo());
    demoWriter = demoW;
    demoW.animateCharacter().catch(function () {
      demoWriter = null;
      setDisplay('hanziDemo', false);
      setDisplay('strokeCanvas', true);
      fallbacks.drawStrokeDemo(lesson);
    });

    var quizW = HW.create('hanziQuiz', ch, optsQuiz());
    quizWriter = quizW;
    quizW
      .quiz({
        onComplete: function () {
          var ts = document.getElementById('traceStatus');
          if (ts) ts.innerHTML = '<div class="trace-done">笔顺描红完成！⭐</div>';
          global._traceOk = true;
          if (typeof global.checkAllGames === 'function') global.checkAllGames();
        },
      })
      .then(function () {
        var ts0 = document.getElementById('traceStatus');
        if (ts0) {
          ts0.innerHTML =
            '<div class="trace-help-line"><strong>① 上框</strong>：跟着灰色笔顺，一笔一笔描</div>' +
            '<div class="trace-help-line"><strong>② 下框</strong>：田字格里有浅字，沿字描红涂满</div>' +
            '<div class="trace-help-tip">完成 ① 或 ② 任意一个即可过关</div>';
        }
        setDisplay('traceCanvas', true);
        if (typeof fallbacks.setupTrace === 'function') {
          fallbacks.setupTrace(lesson, { silentStatus: true });
        }
      })
      .catch(function () {
        quizWriter = null;
        setDisplay('hanziQuiz', false);
        setDisplay('traceCanvas', true);
        fallbacks.setupTrace(lesson);
      });
  }

  function replayDemo(lesson, drawStrokeDemo) {
    function showCanvasReplay() {
      setDisplay('strokeCanvas', true);
      setDisplay('hanziDemo', false);
      if (typeof drawStrokeDemo === 'function') drawStrokeDemo(lesson);
    }

    function playHanzi() {
      if (!demoWriter || typeof demoWriter.animateCharacter !== 'function') {
        showCanvasReplay();
        return;
      }
      try {
        if (typeof demoWriter.cancelAnimation === 'function') {
          demoWriter.cancelAnimation();
        }
        var run = function () {
          demoWriter.animateCharacter();
        };
        if (typeof demoWriter.hideCharacter === 'function') {
          var h = demoWriter.hideCharacter();
          if (h && typeof h.then === 'function') {
            h.then(run).catch(run);
          } else {
            run();
          }
        } else {
          run();
        }
      } catch (e) {
        showCanvasReplay();
      }
    }

    if (demoWriter && typeof demoWriter.animateCharacter === 'function') {
      playHanzi();
      return;
    }
    if (global.HanziWriter && document.getElementById('hanziDemo')) {
      var n = 0;
      var wait = function () {
        if (demoWriter && typeof demoWriter.animateCharacter === 'function') {
          playHanzi();
        } else if (n++ < 12) {
          setTimeout(wait, 80);
        } else {
          showCanvasReplay();
        }
      };
      setTimeout(wait, 50);
      return;
    }
    if (typeof drawStrokeDemo === 'function') showCanvasReplay();
  }

  function replayQuiz(lesson, setupTrace) {
    global._traceOk = false;
    var ts = document.getElementById('traceStatus');
    if (ts && quizWriter) {
      ts.innerHTML = '<div class="trace-help-line"><strong>① 上框</strong>：跟着灰色笔顺描</div>' +
        '<div class="trace-help-line"><strong>② 下框</strong>：田字格浅字描满</div>' +
        '<div class="trace-help-tip">完成任一即可</div>';
    } else if (ts) {
      ts.textContent = '沿田字格浅字描红，涂满过关～';
    }

    if (quizWriter && typeof quizWriter.cancelQuiz === 'function') {
      quizWriter.cancelQuiz();
    }
    if (quizWriter && typeof quizWriter.quiz === 'function') {
      quizWriter.quiz({
        onComplete: function () {
          var el = document.getElementById('traceStatus');
          if (el) el.innerHTML = '<div class="trace-done">笔顺描红完成！⭐</div>';
          global._traceOk = true;
          if (typeof global.checkAllGames === 'function') global.checkAllGames();
        },
      });
    }
    if (typeof setupTrace === 'function') {
      setDisplay('traceCanvas', true);
      setupTrace(lesson, { silentStatus: !!quizWriter });
    }
  }

  global.LiteracyStrokes = {
    initLesson: initLesson,
    replayDemo: replayDemo,
    replayQuiz: replayQuiz,
    getStrokeChar: getStrokeChar,
  };
})(window);
