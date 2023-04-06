import { ProgressSpinnerComponent } from './../../views/components/progress-spinner/progress-spinner/progress-spinner.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Injectable, ComponentRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private _overlayRef?: OverlayRef;

  constructor(
    private overlay: Overlay
  ) { }

  public createOverlay(): void{
    let positionStrategy: GlobalPositionStrategy = this.overlay.position().global();
    positionStrategy = positionStrategy.centerVertically().centerHorizontally();
    const config: OverlayConfig = {
      positionStrategy,
      width: 'auto',
      height: 'auto',
      hasBackdrop: true,
      panelClass: 'app-loading-indicator',
      backdropClass: 'app-loading-indicator-backdrop',
    };
    const overlayRef: OverlayRef = this._overlayRef = this.overlay.create(config);
    const componentPortal: ComponentPortal<ProgressSpinnerComponent> = new ComponentPortal(ProgressSpinnerComponent);

    const componentRef: ComponentRef<ProgressSpinnerComponent> = overlayRef.attach(componentPortal);
  }

  public disposeOverlay(): void{
    this._overlayRef?.dispose();
    this._overlayRef = undefined;
  }
}
