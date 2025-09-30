// nav scroll
		window.addEventListener('scroll', () => {
				const nav = document.getElementById('mainNav');
				const links = document.querySelectorAll('#mainNav a');

				if (window.scrollY > 50) {
					nav.classList.add('scrolled');          // ده اللي يلوّنهم أزرق من الـCSS
					// لو عايزة إجبار اللون بالأستايل المباشر بدل الـCSS علشان أي !important قديم:
					// links.forEach(a => a.style.color = '#1157a4');
				} else {
					nav.classList.remove('scrolled');       // يرجعهم أبيض
					// links.forEach(a => a.style.color = '#fff');
				}
			}, { passive: true });


// Simple carousel logic (safe init)
window.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('#tsl .slide');
  const dots   = document.querySelectorAll('#dots .dot');

  if (!slides.length || !dots.length) {
    console.warn('Carousel elements not found. Check IDs #tsl and #dots.');
    return;
  }

  let i = 0, auto = true, timer;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, idx) => s.style.display = (idx === i ? 'block' : 'none'));
    dots.forEach((d, idx) => d.style.background = (idx === i ? '#000' : 'transparent'));
  }

  dots.forEach((d, idx) => {
    d.type = 'button';                 // منع أي submit لو جوّه فورم
    d.style.cursor = 'pointer';
    d.style.zIndex = 2;
    d.addEventListener('click', () => { auto = false; show(idx); restart(); });
  });

  function next(){ show(i + 1); }
  function restart(){
    clearInterval(timer);
    if (auto) timer = setInterval(next, 5000);
  }

  show(0);
  restart();
});
// faq sec
 (function(){
      const root  = document.getElementById('tetra-faq');
      if(!root) return;
      const items = Array.from(root.querySelectorAll('.tf-item'));

      function closeAll(){
        items.forEach(it=>{
          const btn = it.querySelector('.tf-q');
          const pan = it.querySelector('.tf-a');
          const ic  = it.querySelector('.tf-ic');
          btn.setAttribute('aria-expanded','false');
          pan.style.maxHeight = '0px';
          pan.style.paddingTop = '0px';
          pan.style.paddingBottom = '0px';
          if(ic) ic.style.transform = 'rotate(0deg)';
          it.classList.remove('open');
        });
      }

      function openItem(it){
        const btn = it.querySelector('.tf-q');
        const pan = it.querySelector('.tf-a');
        const ic  = it.querySelector('.tf-ic');
        btn.setAttribute('aria-expanded','true');

   
        const innerH = pan.firstElementChild ? pan.firstElementChild.scrollHeight : pan.scrollHeight;
        pan.style.paddingTop = '12px';
        pan.style.paddingBottom = '12px';
        pan.style.maxHeight = (innerH + 24) + 'px';
        if(ic) ic.style.transform = 'rotate(180deg)';
        it.classList.add('open');
      }

      closeAll();

      
      items.forEach((it, idx)=>{
        const btn = it.querySelector('.tf-q');
        btn.type = 'button';
        btn.addEventListener('click', ()=>{
          const isOpen = btn.getAttribute('aria-expanded') === 'true';
          closeAll();
          if(!isOpen) openItem(it);
        });
  
        btn.addEventListener('keydown', (e)=>{
          if(e.key==='Enter' || e.key===' '){ e.preventDefault(); btn.click(); }
          else if(e.key==='ArrowDown'){ e.preventDefault(); (items[(idx+1)%items.length].querySelector('.tf-q')).focus(); }
          else if(e.key==='ArrowUp'){ e.preventDefault(); (items[(idx-1+items.length)%items.length].querySelector('.tf-q')).focus(); }
        });
      });


      window.addEventListener('resize', ()=>{
        const opened = root.querySelector('.tf-item.open .tf-a');
        if(opened){
          const innerH = opened.firstElementChild ? opened.firstElementChild.scrollHeight : opened.scrollHeight;
          opened.style.maxHeight = (innerH + 24) + 'px';
        }
      });
    })();
//  about script 
    document.addEventListener('DOMContentLoaded', () => {
      const current = (location.pathname || '').toLowerCase();
      document.querySelectorAll('.nav a[href]').forEach(a => {
        const href = a.getAttribute('href').toLowerCase();
        if (current.endsWith(href) || (href.includes('about') && current.includes('about'))) {
          a.classList.add('active');
        }
      });
    });
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.ac-card .ac-toggle').forEach(function(btn){
      btn.addEventListener('click', function(){
        const card = btn.closest('.ac-card');
        const open = card.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.textContent = open ? 'See less' : 'See more';
      });
    });
  });
 document.getElementById('y_foot').textContent = new Date().getFullYear();
// 
(function () {
						const items = document.querySelectorAll('#our-products .reveal');
						if (!('IntersectionObserver' in window)) { return; }

						const io = new IntersectionObserver((entries) => {
							entries.forEach(e => {
								if (e.isIntersecting) {
									e.target.style.animationPlayState = 'running';
									io.unobserve(e.target);
								}
							});
						}, { threshold: 0.15 });

						items.forEach(el => {
							// نوقف الأنيميشن لحد ما يدخل في الشاشة
							el.style.animationPlayState = 'paused';
							io.observe(el);
						});
					})();
          // home
          (function () {
			var el = document.getElementById('y_foot');
			if (el) el.textContent = new Date().getFullYear();
		})();

    	(function () {
			var c = document.body.className;
			c = c.replace(/woocommerce-no-js/, 'woocommerce-js');
			document.body.className = c;
		})();
    document.addEventListener('DOMContentLoaded', () => {
  const p = location.pathname.toLowerCase();
  if (p.endsWith('/') || p.endsWith('/index.html')) {
    document.querySelector('#mainNav .links a[href$="index.html"]')?.classList.add('active');
  }
});
		function initElements($scope) {
			if (typeof elementor !== "undefined" && typeof elementor.widgetsCache["aheto_custom-post-types"].controls !== "undefined") {
				elementor.widgetsCache["aheto_custom-post-types"].controls.taxonomies.select2options.ajax = {
					url: 'https://snapster.foxthemes.me/wp-admin/admin-ajax.php',
					dataType: 'json',
					data: function (params) {
						return {
							query: params.term,
							action: 'autocomplete_aheto_taxonomies'
						}
					},
					processResults: function (data) {
						return {
							results: data
						}
					}
				}
				elementor.widgetsCache["aheto_custom-post-types"].controls.exclude.select2options.ajax = {
					url: 'https://snapster.foxthemes.me/wp-admin/admin-ajax.php',
					dataType: 'json',
					data: function (params) {
						return {
							query: params.term,
							action: 'autocomplete_aheto_exclude_field_search',
							postType: jQuery('select', '.elementor-control-post_type.elementor-control-type-select').val()
						}
					},
					processResults: function (data) {
						return {
							results: data
						}
					}
				}
				elementor.widgetsCache["aheto_custom-post-types"].controls.include.select2options.ajax = {
					url: 'https://snapster.foxthemes.me/wp-admin/admin-ajax.php',
					dataType: 'json',
					data: function (params) {
						return {
							query: params.term,
							action: 'autocomplete_aheto_include_field_search'
						}
					},
					processResults: function (data) {
						return {
							results: data
						}
					}
				}
			}
		}
		window.addEventListener('load', function () {
			setTimeout(() => {
				initElements();
			}, 4000);
		});
		(typeof elementor !== "undefined") && elementor.hooks.addAction('panel/open_editor/widget', function (panel, model, view) {
			if ('aheto_custom-post-types' === model.attributes.widgetType) {
				initElements();
				setTimeout(() => {
					initElements();
				}, 1000);
			}
		});
    		function initElements($scope) {
			if (typeof elementor !== "undefined" && typeof elementor.widgetsCache["aheto_custom-post-types"].controls !== "undefined") {
				elementor.widgetsCache["aheto_custom-post-types"].controls.taxonomies.select2options.ajax = {
					url: 'https://snapster.foxthemes.me/wp-admin/admin-ajax.php',
					dataType: 'json',
					data: function (params) {
						return {
							query: params.term,
							action: 'autocomplete_aheto_taxonomies'
						}
					},
					processResults: function (data) {
						return {
							results: data
						}
					}
				}
				elementor.widgetsCache["aheto_custom-post-types"].controls.exclude.select2options.ajax = {
					url: 'https://snapster.foxthemes.me/wp-admin/admin-ajax.php',
					dataType: 'json',
					data: function (params) {
						return {
							query: params.term,
							action: 'autocomplete_aheto_exclude_field_search',
							postType: jQuery('select', '.elementor-control-post_type.elementor-control-type-select').val()
						}
					},
					processResults: function (data) {
						return {
							results: data
						}
					}
				}
				elementor.widgetsCache["aheto_custom-post-types"].controls.include.select2options.ajax = {
					url: 'https://snapster.foxthemes.me/wp-admin/admin-ajax.php',
					dataType: 'json',
					data: function (params) {
						return {
							query: params.term,
							action: 'autocomplete_aheto_include_field_search'
						}
					},
					processResults: function (data) {
						return {
							results: data
						}
					}
				}
			}
		}
		window.addEventListener('load', function () {
			setTimeout(() => {
				initElements();
			}, 4000);
		});
		(typeof elementor !== "undefined") && elementor.hooks.addAction('panel/open_editor/widget', function (panel, model, view) {
			if ('aheto_custom-post-types' === model.attributes.widgetType) {
				initElements();
				setTimeout(() => {
					initElements();
				}, 1000);
			}
		});


    // blog
        // Toggle Read more / Read less لكل كرت
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.exp-toggle');
  if (!btn) return;

  const sel = btn.getAttribute('data-target');
  const target = document.querySelector(sel);
  if (!target) return;

  // لو محددة عدد سطور مختلف
  const lines = target.getAttribute('data-lines');
  if (lines) target.style.setProperty('--lines', lines);

  target.classList.toggle('expanded');
  const expanded = target.classList.contains('expanded');
  btn.textContent = expanded ? 'Read less' : 'Read more';
  btn.setAttribute('aria-expanded', expanded);
});