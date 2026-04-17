// Çoklu seçim dikdörtgeni fonksiyonlari
function startRectSelection(e){
  if(e.button === 2){ // Sag tik
    const da = document.getElementById("deskarea");
    const rect = da.getBoundingClientRect();
    
    isRectSelecting = true;
    rectStartX = e.clientX - rect.left;
    rectStartY = e.clientY - rect.top;
    
    selectionRect = document.getElementById("selection-rect");
    selectionRect.style.left = rectStartX + "px";
    selectionRect.style.top = rectStartY + "px";
    selectionRect.style.width = "0px";
    selectionRect.style.height = "0px";
    selectionRect.style.display = "block";
    
    e.preventDefault();
    e.stopPropagation();
  }
}

function updateRectSelection(e){
  if(!isRectSelecting || !selectionRect) return;
  
  const da = document.getElementById("deskarea");
  const rect = da.getBoundingClientRect();
  
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;
  
  const left = Math.min(rectStartX, currentX);
  const top = Math.min(rectStartY, currentY);
  const width = Math.abs(currentX - rectStartX);
  const height = Math.abs(currentY - rectStartY);
  
  selectionRect.style.left = left + "px";
  selectionRect.style.top = top + "px";
  selectionRect.style.width = width + "px";
  selectionRect.style.height = height + "px";
}

function endRectSelection(){
  if(!isRectSelecting) return;
  
  isRectSelecting = false;
  
  // Secim alanindaki ikonlari sec
  if(selectionRect){
    const selRect = selectionRect.getBoundingClientRect();
    const da = document.getElementById("deskarea");
    
    // Mevcut secimi temizle (Ctrl basili degilse)
    if(!event.ctrlKey && !event.shiftKey){
      selectedIcons.clear();
    }
    
    desktopIcons.forEach((icon, i) => {
      const iconEl = da.querySelector(`[data-icon-index="${i}"]`);
      if(iconEl){
        const iconRect = iconEl.getBoundingClientRect();
        
        // Ikon secim dikdortgeni içinde mi?
        if(iconRect.left < selRect.right &&
           iconRect.right > selRect.left &&
           iconRect.top < selRect.bottom &&
           iconRect.bottom > selRect.top){
          selectedIcons.add(i);
        }
      }
    });
    
    selectionRect.style.display = "none";
    renderDesktop();
  }
}

// Masaüstü event listenerlari
document.getElementById("desktop").addEventListener("mousedown", startRectSelection);
document.addEventListener("mousemove", updateRectSelection);
document.addEventListener("mouseup", endRectSelection);
