import * as arithmetic from './arithmetic.js';
import * as fractions from './fractions.js';
import * as algebra from './algebra.js';
import * as decimals from './decimals.js';
import * as ratios from './ratios.js';
import * as geometry from './geometry.js';
import * as geometry2 from './geometry2.js';
import * as data from './data.js';
import * as shapes from './shapes.js';
import * as numbers4 from './numbers4.js';
import * as logic from './logic.js';

// Every widget a lesson can use by name: widget('numberLineWalk', {mode:'sub'})
export const WIDGETS = {
  numberLineWalk: arithmetic.numberLineWalk,
  arrayModel: arithmetic.arrayModel,
  sieve: arithmetic.sieve,
  factorTree: arithmetic.factorTree,
  divisibility: arithmetic.divisibility,
  lcmGcd: arithmetic.lcmGcd,
  exponentTiles: arithmetic.exponentTiles,
  negExponent: arithmetic.negExponent,
  squareRoot: arithmetic.squareRoot,
  fractionExplorer: fractions.fractionExplorer,
  fractionProduct: fractions.fractionProduct,
  fractionDivide: fractions.fractionDivide,
  commonDenominator: fractions.commonDenominator,
  simplifyFraction: fractions.simplifyFraction,
  ...algebra, ...decimals, ...ratios, ...geometry, ...geometry2, ...data, ...shapes, ...numbers4, ...logic,
};
