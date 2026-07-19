c// ==UserScript==
// @name        13.06.2026 QA Migrator Auto-Detect OneTrust (Fully English)
// @namespace   http://tampermonkey.net/
// @version     31.0
// @description Fully English version. Added ability to turn off/close the script directly on the page to restore normal view.
// @match       :///*
// @noframes
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==
 
(function() {
    'use strict';
 
    if (window.top !== window.self) return;
 
    // ==========================================
    // 1. STYLING
    // ==========================================
    GM_addStyle(`
        /* Using a class instead of styling the body tag directly so it can be easily reverted on close */
        body.qa-active-body { padding-top: 45px !important; }
 
        #onetrust-banner-sdk { outline: 3px solid #00ff00 !important; outline-offset: -3px; }
        #onetrust-consent-sdk { z-index: 2147483646 !important; }
 
        #qa-ribbon {
            position: fixed; top: 0; left: 0; right: 0; height: 45px;
            background: #ffffff; color: #333; padding: 0 20px;
            font-family: Arial, sans-serif; font-size: 13px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            display: flex; align-items: center; justify-content: space-between;
            z-index: 2147483647 !important; border-bottom: 2px solid #ddd;
        }
 
        .qa-group { display: flex; align-items: center; gap: 15px; }
        .qa-divider { width: 1px; height: 25px; background: #ddd; margin: 0 5px; }
 
        .qa-metric { display: flex; align-items: center; gap: 6px; font-weight: bold; color: #444;}
        .badge-pass { background: #4caf50; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase;}
        .badge-fail { background: #f44336; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase;}
 
        .qa-btn { padding: 6px 12px; border: none; cursor: pointer; font-weight: bold; border-radius: 4px; color: white; font-size: 12px; transition: opacity 0.2s; }
        .qa-btn:hover { opacity: 0.8; }
        .qa-btn-toggle { background: #2196f3; }
        .qa-btn-toggle.hidden-state { background: #9e9e9e; text-decoration: line-through; }
        .qa-btn-red { background: #f44336; }
        .qa-btn-dark { background: #333; }
        .qa-btn-success { background: #4caf50; }
 
        .qa-input {
            padding: 6px 10px !important;
            border: 1px solid #ccc !important;
            border-radius: 4px !important;
            font-size: 13px !important;
            width: 300px !important;
            outline: none !important;
            transition: border 0.2s !important;
            color: #111111 !important;
            background-color: #ffffff !important;
        }
        .qa-input:focus { border: 1px solid #2196f3 !important; }
        .qa-input::placeholder { color: #777777 !important; opacity: 1 !important; }
 
        #qa-details-modal {
            display: none; position: fixed; top: 60px; left: 50%; transform: translateX(-50%);
            width: 90vw; max-width: 1200px; max-height: 80vh; overflow-y: auto;
            background: #fff; padding: 20px; border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5); z-index: 2147483647 !important;
            border: 2px solid #2196f3; font-family: monospace; font-size: 13px; color: #222;
        }
        .qa-modal-grid { display: flex; gap: 20px; margin-top: 15px; }
        .qa-modal-col { flex: 1; background: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 4px; }
        .qa-modal-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid #ddd; padding-bottom: 5px; }
        .qa-modal-close { display: block; width: 100%; padding: 10px; margin-top: 15px; background: #333; color: white; text-align: center; cursor: pointer; border: none; font-weight: bold; border-radius: 4px;}
        .qa-data-block { margin-bottom: 15px; }
        .qa-data-block strong { color: #555; display: block; margin-bottom: 3px; }
        .qa-data-value { background: #fff; padding: 8px; border: 1px dashed #ccc; overflow-wrap: break-word; word-break: break-all;}
    `);
 
    // ==========================================
    // 2. AUTO-DETECT OLD BANNER
    // ==========================================
    function findOldBanner() {
        const privacyRegex = /cookie|ciastecz|privacy|prywatność|privacidad|privacidade|datenschutz|traceurs|rodo|gdpr|dsgvo|consentimiento|consenso|zgod/i;
        const devClassesRegex = /cookie|consent|privacy|gdpr|rodo|dsgvo|cc-window|cmp|tarteaucitron|usercentrics|optanon/i;
        const gateRegex = /veterinar|weterynar|vétérinaire|tierarzt|professional|profesjonal|profesional|healthcare|medical|medycyn|médic|age gate|18 years|under 18|over 18|lat 18|18 lat|not a veterinary/i;
 
        let bestMatch = null;
        let highestScore = 0;
 
        const elements = document.querySelectorAll('div, section, aside, dialog');
        elements.forEach(el => {
            if (el.id.includes('qa-') || (typeof el.className === 'string' && el.className.includes('qa-'))) return;
 
            const text = el.innerText || "";
            if (text.length > 2500 || text.length < 15) return;
            if (gateRegex.test(text)) return;
 
            let score = 0;
            const privacyMatches = (text.match(privacyRegex) || []).length;
            const hasDevClass = devClassesRegex.test(el.id) || (typeof el.className === 'string' && devClassesRegex.test(el.className));
 
            if (privacyMatches === 0 && !hasDevClass) return;
 
            score += privacyMatches * 15;
            if (hasDevClass) score += 25;
 
            const style = window.getComputedStyle(el);
            if (['fixed', 'sticky'].includes(style.position)) score += 20;
            if (style.position === 'absolute') score += 5;
            if (parseInt(style.zIndex) > 90) score += 10;
            if (style.bottom === '0px' || style.top === '0px') score += 15;
 
            const btns = el.querySelectorAll('button, a[class*="btn"], [role="button"]').length;
            if (btns >= 1 && btns <= 4) score += 15;
            else if (btns > 4 && btns < 8) score += 5;
 
            if (el.parentElement === document.body) score += 10;
 
            if (score > highestScore && score > 35) {
                highestScore = score;
                bestMatch = el;
            }
        });
 
        // Forced "bulletproof" frame
        if (bestMatch) {
            bestMatch.style.setProperty('outline', '4px solid #ff0000', 'important');
            bestMatch.style.setProperty('outline-offset', '-4px', 'important');
            bestMatch.style.setProperty('box-shadow', '0 0 20px 5px rgba(255, 0, 0, 0.6)', 'important');
            bestMatch.style.setProperty('transition', 'opacity 0.2s', 'important');
            bestMatch.style.setProperty('z-index', '2147483645', 'important');
        }
        return bestMatch;
    }
 
    // ==========================================
    // 3. QA LOGIC & SMART BUTTON DETECTION
    // ==========================================
    const getButtonElements = (container) => {
        let candidates = Array.from(container.querySelectorAll('a, button, input[type="button"], input[type="submit"], [role="button"], span[class*="close"], div[class*="close"], i[class*="close"]'));
 
        return candidates.filter(el => {
            // Native buttons
            if (el.tagName === 'BUTTON' || el.tagName === 'INPUT' || el.getAttribute('role') === 'button') return true;
 
            const cls = (typeof el.className === 'string' ? el.className : '').toLowerCase();
            const id = (el.id || '').toLowerCase();
            const text = (el.innerText || el.textContent || '').trim().toLowerCase();
            const aria = (el.getAttribute('aria-label') || '').toLowerCase();
 
            // If class name simply contains 'btn' or 'button' (e.g. btn-primary, closeBtn)
            if (/(btn|button)/i.test(cls)) return true;
 
            // CRITICAL: Action words must be isolated (e.g. '-close-', 'accept') to prevent catching 'consent-policy'
            if (/(^|[-_ ])(cta|accept|allow|deny|reject|agree|dismiss|close|ok|aceptar|akzeptieren|cerrar)($|[-_ ])/.test(cls)) return true;
 
            // Same for ID
            if (/(^|[-_ ])(accept|close)($|[-_ ])/.test(id)) return true;
 
            // Aria Labels for X-type icons (e.g. "Close", "Cerrar")
            if (aria && /(^|[-_ ])(close|cerrar|schließen|dismiss|x)($|[-_ ])/.test(aria)) return true;
 
            // Handle <a> tags acting as buttons
            if (el.tagName === 'A') {
                const href = el.getAttribute('href');
                // If it doesn't lead to a real URL, it's probably a button
                if (!href || href === '#' || href.startsWith('javascript:')) return true;
 
                // Exact text match for actions (prevents catching "Privacy Policy" as a button)
                if (/^(accept|allow|agree|ok|yes|close|dismiss|x|×|aceptar|akzeptieren|zgadzam|akceptuj|zrozumiałem|zamykam|understood|rozumiem|verstanden|got it|save|confirm)$/.test(text)) return true;
            }
 
            // Close icons
            if (el.tagName === 'SPAN' || el.tagName === 'DIV' || el.tagName === 'I') {
                if (/(^|[-_ ])(close|dismiss|x)($|[-_ ])/.test(cls)) return true;
                if (text === 'x' || text === '×') return true;
            }
 
            return false;
        });
    };
 
    const normalizeForCompare = (text) => {
        if (!text) return '';
        return text.normalize("NFD")
                   .replace(/[\u0300-\u036f]/g, "")
                   .replace(/[^a-zA-Z0-9]/g, "")
                   .toLowerCase();
    };
 
    const normalizeUrl = (url) => {
        if (!url) return '';
        try {
            let parsed = new URL(url, window.location.origin);
            let clean = parsed.hostname.replace(/^www\./, '') + parsed.pathname.replace(/\/$/, '') + parsed.search;
            return clean.toLowerCase();
        } catch (e) {
            return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').toLowerCase();
        }
    };
 
    const getCleanTextFromDOM = (element) => {
        if (!element) return 'NO TEXT';
        let clone = element.cloneNode(true);
 
        let btnsToRemove = getButtonElements(clone);
        btnsToRemove.forEach(el => el.remove());
 
        const hasWords = str => {
            let cleaned = str.replace(/[\s.,/#!$%\^&\*;:{}=\-_`~()'"\[\]„”«»]/g, '');
            return cleaned.length > 0;
        };
 
        let changed = true;
        while(changed) {
            changed = false;
            let links = Array.from(clone.querySelectorAll('a[href]'));
 
            for(let a of links) {
                let textBefore = "";
                let textAfter = "";
 
                try {
                    let rangeBefore = document.createRange();
                    rangeBefore.setStart(clone, 0);
                    rangeBefore.setEndBefore(a);
                    textBefore = rangeBefore.toString();
 
                    let rangeAfter = document.createRange();
                    rangeAfter.setStartAfter(a);
                    rangeAfter.setEnd(clone, clone.childNodes.length);
                    textAfter = rangeAfter.toString();
                } catch (e) {
                    textBefore = "";
                    textAfter = "";
                }
 
                if (!hasWords(textBefore) || !hasWords(textAfter)) {
                    a.remove();
                    changed = true;
                    break;
                }
            }
        }
 
        clone.querySelectorAll('a[href]').forEach(a => {
            let textNode = document.createTextNode(a.textContent);
            a.parentNode.replaceChild(textNode, a);
        });
 
        let text = clone.innerText || clone.textContent || '';
        return text.replace(/\s+/g, ' ').trim();
    };
 
    const getLinks = (container) => {
        return Array.from(container.querySelectorAll('a[href]'))
            .map(a => a.href)
            .filter(href => !href.startsWith('javascript:') && !href.startsWith('mailto:'));
    };
 
    const getStrictButtonTexts = (container) => {
        let buttons = getButtonElements(container);
        buttons = buttons.filter(btn => {
            const rect = btn.getBoundingClientRect();
            const style = window.getComputedStyle(btn);
            return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
        });
 
        buttons.sort((a, b) => {
            const rectA = a.getBoundingClientRect();
            const rectB = b.getBoundingClientRect();
            if (Math.abs(rectA.top - rectB.top) < 10) return rectA.left - rectB.left;
            return rectA.top - rectB.top;
        });
 
        return buttons.map(btn => {
            let text = (btn.innerText || btn.textContent || '').replace(/\s+/g, ' ').trim();
 
            // Rescuing empty buttons (e.g., "X" crosses made with SVG icons)
            if (!text && btn.hasAttribute('aria-label')) {
                text = btn.getAttribute('aria-label').trim();
            }
            if (!text && btn.hasAttribute('title')) {
                text = btn.getAttribute('title').trim();
            }
            if (!text) {
                const clsId = ((btn.className || '') + ' ' + (btn.id || '')).toLowerCase();
                if (clsId.includes('close') || clsId.includes('dismiss')) text = 'Close';
            }
 
            if (text === '×') text = 'X';
            return text;
        }).filter(text => text.length > 0);
    };
 
    const arraysEqualStrict = (a, b) => {
        if (a.length !== b.length) return false;
        return a.every((val, index) => normalizeForCompare(val) === normalizeForCompare(b[index]));
    };
 
    const linksEqualUnordered = (a, b) => {
        if (a.length !== b.length) return false;
        let sortedA = [...a].map(normalizeUrl).sort();
        let sortedB = [...b].map(normalizeUrl).sort();
        return sortedA.every((val, index) => val === sortedB[index]);
    };
 
    // ==========================================
    // 4. MAIN FLOW, TURN OFF LOGIC & UI RENDERING
    // ==========================================
    let oldBannerElementDOM = null;
    let oldData = { text: "Not detected", btnTexts: [], links: [] };
 
    // Function to completely "kill" the script on the current page
    function turnOffQA() {
        // Remove Ribbon
        const ribbon = document.getElementById('qa-ribbon');
        if (ribbon) ribbon.remove();
 
        // Remove Modal
        const modal = document.getElementById('qa-details-modal');
        if (modal) modal.remove();
 
        // Revert body top padding
        document.body.classList.remove('qa-active-body');
 
        // Clear red frame from detected banner
        if (oldBannerElementDOM) {
            oldBannerElementDOM.style.removeProperty('outline');
            oldBannerElementDOM.style.removeProperty('outline-offset');
            oldBannerElementDOM.style.removeProperty('box-shadow');
            oldBannerElementDOM.style.removeProperty('z-index');
        }
 
        // Remove injected OneTrust (if exists)
        const otContainer = document.querySelector('#onetrust-consent-sdk');
        if (otContainer) otContainer.remove();
    }
 
    function initQA() {
        document.body.classList.add('qa-active-body');
 
        oldBannerElementDOM = findOldBanner();
        if (oldBannerElementDOM) {
            oldData.text = getCleanTextFromDOM(oldBannerElementDOM);
            oldData.btnTexts = getStrictButtonTexts(oldBannerElementDOM);
            oldData.links = getLinks(oldBannerElementDOM);
        }
 
        const ribbon = document.createElement('div');
        ribbon.id = 'qa-ribbon';
        document.body.appendChild(ribbon);
 
        let otId = GM_getValue('ot_script_id_' + window.location.hostname);
 
        if (!otId) {
            renderSetupUI(ribbon);
        } else {
            renderLoadingUI(ribbon);
            injectOneTrust(otId, ribbon);
        }
    }
 
    function renderSetupUI(ribbon) {
        ribbon.innerHTML = `
<div class="qa-group">
<strong style="color: #000; font-size: 14px; margin-right: 10px;">QA Migrator</strong>
<input type="text" id="qa-ot-input" class="qa-input" placeholder="Paste OneTrust Script ID for this domain..." autocomplete="off"/>
<button id="qa-load-ot" class="qa-btn qa-btn-success">Load OneTrust</button>
</div>
<div class="qa-group">
<span style="color: #888; font-style: italic;">Waiting for setup...</span>
<div class="qa-divider"></div>
<button id="qa-turn-off" class="qa-btn qa-btn-red" title="Close QA Migrator for this page">❌ Close</button>
</div>
        `;
 
        document.getElementById('qa-load-ot').addEventListener('click', () => {
            const inputVal = document.getElementById('qa-ot-input').value.trim();
            if (inputVal) {
                GM_setValue('ot_script_id_' + window.location.hostname, inputVal);
                renderLoadingUI(ribbon);
                injectOneTrust(inputVal, ribbon);
            }
        });
 
        document.getElementById('qa-turn-off').addEventListener('click', turnOffQA);
    }
 
    function renderLoadingUI(ribbon) {
        ribbon.innerHTML = `
<div class="qa-group">
<strong style="color: #000; font-size: 14px; margin-right: 10px;">QA Migrator</strong>
<span style="color: #2196f3; font-weight: bold;">Loading OneTrust Banner... ⏳</span>
</div>
        `;
    }
 
    function injectOneTrust(otId, ribbon) {
        let otScript = document.createElement('script');
        otScript.src = "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js";
        otScript.type = "text/javascript";
        otScript.setAttribute("data-domain-script", otId);
        document.head.appendChild(otScript);
 
        let attempts = 0;
        const checkExist = setInterval(function() {
            attempts++;
            const otBannerContent = document.querySelector('#onetrust-banner-sdk');
 
            if (otBannerContent) {
                clearInterval(checkExist);
                setTimeout(() => renderComparisonUI(otBannerContent, ribbon), 1500);
            } else if (attempts > 30) {
                clearInterval(checkExist);
                ribbon.innerHTML = `
<div class="qa-group">
<strong style="color: #000; font-size: 14px; margin-right: 10px;">QA Migrator</strong>
<span style="color: #f44336; font-weight: bold;">❌ OneTrust failed to load (Check ID).</span>
</div>
<div class="qa-group">
<button id="qa-reset-fail" class="qa-btn qa-btn-dark">Reset ID</button>
<div class="qa-divider"></div>
<button id="qa-turn-off-fail" class="qa-btn qa-btn-red">❌ Close</button>
</div>
                `;
                document.getElementById('qa-reset-fail').addEventListener('click', () => {
                    GM_setValue('ot_script_id_' + window.location.hostname, '');
                    location.reload();
                });
                document.getElementById('qa-turn-off-fail').addEventListener('click', turnOffQA);
            }
        }, 500);
    }
 
    function renderComparisonUI(otBannerElement, ribbon) {
        const otData = {
            text: getCleanTextFromDOM(otBannerElement),
            btnTexts: getStrictButtonTexts(otBannerElement),
            links: getLinks(otBannerElement)
        };
 
        const isTextMatch = normalizeForCompare(oldData.text) === normalizeForCompare(otData.text);
        const isBtnsMatch = arraysEqualStrict(oldData.btnTexts, otData.btnTexts);
        const isLinksMatch = linksEqualUnordered(oldData.links, otData.links);
 
        ribbon.innerHTML = `
<div class="qa-group">
<strong style="color: #000; font-size: 14px; margin-right: 10px;">QA</strong>
<button id="qa-toggle-old" class="qa-btn qa-btn-toggle">Old Banner (ON)</button>
<button id="qa-toggle-ot" class="qa-btn qa-btn-toggle">OneTrust (ON)</button>
</div>
 
            <div class="qa-divider"></div>
 
            <div class="qa-group">
<div class="qa-metric">1. Text: <span class="${isTextMatch ? 'badge-pass' : 'badge-fail'}">${isTextMatch ? 'MATCH' : 'MISMATCH'}</span></div>
<div class="qa-metric">2. Links: <span class="${isLinksMatch ? 'badge-pass' : 'badge-fail'}">${isLinksMatch ? 'MATCH' : 'MISMATCH'}</span></div>
<div class="qa-metric">3. Buttons: <span class="${isBtnsMatch ? 'badge-pass' : 'badge-fail'}">${isBtnsMatch ? 'MATCH' : 'MISMATCH'}</span></div>
</div>
 
            <div class="qa-divider"></div>
 
            <div class="qa-group">
<button id="qa-show-details" class="qa-btn qa-btn-dark">🔍 DETAILS</button>
<button id="qa-reset-id" class="qa-btn qa-btn-dark">Reset ID</button>
<div class="qa-divider"></div>
<button id="qa-turn-off" class="qa-btn qa-btn-red" title="Close QA Migrator for this page">❌ Close</button>
</div>
        `;
 
        const formatLinksHtml = (linksArr) => {
            if (linksArr.length === 0) return 'None';
            return linksArr.map(url => ⁠ <a href="${url}" target="_blank" style="color:#2196f3;">${url}</a> ⁠).join('<br><br>');
        };
 
        const modal = document.createElement('div');
        modal.id = 'qa-details-modal';
        modal.innerHTML = `
<h2 style="margin:0 0 10px 0;">QA Extraction Details (Why is it failing?)</h2>
<p style="color:#666; margin-bottom: 10px;">Compare the outputs below. URLs are normalized (http/www stripped) during logic check.</p>
<div class="qa-modal-grid">
<div class="qa-modal-col">
<div class="qa-modal-title" style="color:red;">OLD BANNER</div>
<div class="qa-data-block"><strong>Extracted Text:</strong><div class="qa-data-value">${oldData.text}</div></div>
<div class="qa-data-block"><strong>Buttons Found (${oldData.btnTexts.length}):</strong><div class="qa-data-value">${oldData.btnTexts.length > 0 ? '[ ' + oldData.btnTexts.join(' ]<br>[ ') + ' ]' : 'None'}</div></div>
<div class="qa-data-block"><strong>Links Found (${oldData.links.length}):</strong><div class="qa-data-value">${formatLinksHtml(oldData.links)}</div></div>
</div>
<div class="qa-modal-col">
<div class="qa-modal-title" style="color:green;">ONETRUST</div>
<div class="qa-data-block"><strong>Extracted Text:</strong><div class="qa-data-value">${otData.text}</div></div>
<div class="qa-data-block"><strong>Buttons Found (${otData.btnTexts.length}):</strong><div class="qa-data-value">${otData.btnTexts.length > 0 ? '[ ' + otData.btnTexts.join(' ]<br>[ ') + ' ]' : 'None'}</div></div>
<div class="qa-data-block"><strong>Links Found (${otData.links.length}):</strong><div class="qa-data-value">${formatLinksHtml(otData.links)}</div></div>
</div>
</div>
<button id="qa-modal-close" class="qa-modal-close">CLOSE DETAILS</button>
        `;
        document.body.appendChild(modal);
 
        let oldVisible = true;
        let otVisible = true;
 
        document.getElementById('qa-toggle-old').addEventListener('click', (e) => {
            if (!oldBannerElementDOM) return;
            oldVisible = !oldVisible;
            oldBannerElementDOM.style.opacity = oldVisible ? "1" : "0";
            oldBannerElementDOM.style.pointerEvents = oldVisible ? "auto" : "none";
            e.target.innerText = ⁠ Old Banner (${oldVisible ? 'ON' : 'OFF'}) ⁠;
            e.target.classList.toggle('hidden-state', !oldVisible);
        });
 
        document.getElementById('qa-toggle-ot').addEventListener('click', (e) => {
            const otContainer = document.querySelector('#onetrust-consent-sdk');
            if (!otContainer) return;
            otVisible = !otVisible;
            otContainer.style.display = otVisible ? "block" : "none";
            e.target.innerText = ⁠ OneTrust (${otVisible ? 'ON' : 'OFF'}) ⁠;
            e.target.classList.toggle('hidden-state', !otVisible);
        });
 
        document.getElementById('qa-show-details').addEventListener('click', () => {
            modal.style.display = 'block';
        });
 
        document.getElementById('qa-modal-close').addEventListener('click', () => {
            modal.style.display = 'none';
        });
 
        document.getElementById('qa-reset-id').addEventListener('click', () => {
            GM_setValue('ot_script_id_' + window.location.hostname, '');
            modal.remove();
            renderSetupUI(ribbon);
        });
 
        document.getElementById('qa-turn-off').addEventListener('click', turnOffQA);
    }
 
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(initQA, 1000));
    } else {
        setTimeout(initQA, 1000);
    }
 
})();