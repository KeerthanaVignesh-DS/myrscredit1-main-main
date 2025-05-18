<!-- <p>Hello,</p>
<p>A new invoice has been uploaded.</p>
<p><strong>Invoice Number:</strong> {{ $invoice->invoice_number }}</p>
<p>The invoice file is attached to this email.</p>
<p>Thank you!</p> -->

<p>
            <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                Please find {{ $invoice->pdf_type }} for {{ $invoice->month }}_{{ $invoice->year }}. To view {{ $invoice->pdf_type }} please click <a href="https://app.myrscredit.com">
                    here</a></font>
            <br />
            <br />
            <br />
        </p>
        Regards,<br />
        Myrs Credit