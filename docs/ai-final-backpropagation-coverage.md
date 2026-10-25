# FINAL Multilayer & Backpropagation coverage

Stable ID `artificial-intelligence-final-backpropagation`; [lesson](../courses/artificial-intelligence/summaries/final-backpropagation.md). Six authored exercises; one runnable Python block. Original source PDFs remain local-only.

Visually reviewed S10 `Final/ANN.pdf` pp.19–24 and S11 `Final/Intro_DeepLearning_Slides.pdf` pp.2–5. S10 p.20 XOR weights transcribed directly: OR(1,1,bias-.5),AND(1,1,bias-1.5),output(1,-2,bias-.5). All four threshold states checked. Not claimed to be sigmoid training output. S10 p.21–22 sigmoid/derivative; p.23 half-sum squared loss; p.24 source delta=(target-output)*derivative, plus-update; lesson gradient uses opposite sign with minus-update, equivalent. Every hidden gradient uses OLD output weights; independent biases and simultaneous update explicit. S11 nonlinear/shallow/deep figures discussed without copying imagery.

Authored numeric 2-2-1 sigmoid example, input(1,.5),target.8,rate.2. All nine derivatives and updated weights shown. Old loss.02603023877542725; new.025035809127721003. Stage D verifies909 gradients via independent central differences across101 parameter/input cases, each forward loss independently, source XOR, saturation and all exercise arithmetic. No claim of global convergence or model performance. Loss sum/mean convention, local minima and saturation noted.
