import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { secureGuardsGuard } from './secure-guards.guard';

describe('secureGuardsGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => secureGuardsGuard(...guardParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});
