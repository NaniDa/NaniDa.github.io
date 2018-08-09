
function createCommentElem() {
  var comments = document.createElement('div')
  comments.className = 'so_promo_comments'
  return comments
}

// loading $SO
function loadSO(callback) {
  var head = document.querySelector('head')
  var script = document.createElement('script')
  script.async = 'async'
  script.src = '//embed.solidopinion.com/so_wl.js'
  // script.src = '//cdn.solidopinion.com/widget-loader/1.1.14/bundle-starter.js'
  script.setAttribute('auto-start', false)
  script.addEventListener('load', callback, false)
  head.appendChild(script)
}

/**
 * This function initialize 'SHOW COMMENTS' button
 * and add handler for click event
 */
function initShowCommentsBtn() {
  var container = document.querySelector('.trb_cm')
  var btn = document.querySelector('[data-role="cm_expander"]')

  btn.addEventListener('click', function (event) {
    if (btn.className.search('opened') > -1) {
      btn.className = btn.className.replace(/ opened/ig, '')
      toggleComments(false)
    }
    else {
      btn.className += ' opened'
      if (!jQuery('.so_promo_comments').length) {
        var comments = createCommentElem()
        container.appendChild(comments)
      }

      if (window.$SO) {
        toggleComments(true)
      } else {
        loadSO(function () {
          toggleComments(true)
        })
      }

    }
  }, true)
}

function toggleComments(showComments) {
  if (showComments) {
    $SO.callAction('start-widget', 'so_promo_comments')
    $SO.callAction('remove-widget', 'so_promo_comments_express')
  }
  else {
    $SO.callAction('remove-widget', 'so_promo_comments')
    $SO.callAction('start-widget', 'so_promo_comments_express')

    setTimeout(function() {
      document
        .querySelectorAll('.so_promo_comments_express iframe')
        .forEach(function (el) {
          el.src = el.src
        })
    }, 100)
  }
}

/**
 * When DOM is ready we add all event handlers to dialog btns.
 */
document.addEventListener('DOMContentLoaded', function (event) {
  initShowCommentsBtn()
})

