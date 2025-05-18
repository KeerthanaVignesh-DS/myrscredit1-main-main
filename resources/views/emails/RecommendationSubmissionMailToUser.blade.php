<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
</head>
<body>
    <div>
        Dear {{$user['name']}},<br />
        <p>
            <span>Your Submission form is sent to Myrs,
                <br />
                <br />
                <font style="font-size: 18px; color: #554B9D; font-family: Times New Roman,Times,serif;">
                    Client Information as follows: </font></span>
        </p>
        <p>
            Name : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                {{$user['name']}}</font><br />
            Title : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                {{$user['title']}}</font><br />
            Company : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                {{$user['company']}}</font><br />
            Address1 : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                {{$user['address1']}}</font><br />
            Address2 : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                {{$user['address2']}}</font><br />
            City : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                 {{$user['city']}}</font><br />
            Zip: <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                {{$user['zip']}}</font><br />
            Country : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                {{$user['country']}}</font><br />
            State/Province : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                {{$user['state']}}</font><br />
            Email : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                {{$user['email']}}</font><br />
            Phone : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                {{$user['phone']}}</font><br />
            Fax : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                {{$user['fax']}}</font><br />
            <!-- Submission Date : <font style="font-size: 15px; color: #554B9D; font-family: Times New Roman,Times,serif">
                [SubmissionDate]</font><br /> -->
        </p>
        <p>
            <span style="font-size: 18px; color: #554B9D; font-family: Times New Roman,Times,serif;">
                Account Information as follows:</span>
        </p>
        <p>
             <table cellspacing="0" cellpadding="0">
          <tr>
            <td>{{ $data['account_name'] }}</td>
          </tr>
          <tr>
            <td>{{ $data['account_address1'] }}</td>
          </tr>
          <tr>
            <td>{{ $data['account_address2'] }}</td>
          </tr>
          <tr>
            <td>{{ $data['account_city'] }},&nbsp;{{ $data['account_state'] }}&nbsp;&nbsp;{{ $data['account_zip'] }}</td>
          </tr>
          <tr>
            <td>{{ $data['account_phone']}}</td>
          </tr>
          <tr>
            <td>
                @if($data['myrsProduct'] == 1)
                        <p>Summary Credit Report</p>
                    @else
                        <p>Summary Credit Report w/details</p>
                    @endif
            </td>
          </tr>
          <tr>
            <td>
                    @if($data['expressService'] == 1)
                        <p>Instant Response (4 Office Hours)</p>
                    @elseif ($data['expressService'] == 2)
                        <p>Rapid Response (8 Office Hours)</p>
                    @elseif ($data['expressService'] == 3)
                        <p>Fast Response (12 Office Hours)</p>
                    @elseif ($data['expressService'] == 4)
                        <p>Quick Response (16 Office Hours)</p>
                    @else
                        Standard Response (24+/- Office Hours)
                    @endif
            </td>
          </tr>
          <tr>
            <td>{{ $data['orderAmount'] }}</td>
          </tr>
          <tr>
            <td>-------------------------------</td>
          </tr>
        </table>
            <br />
            <br />
            <br />
            <br />
        </p>
        Regards,<br />
        Myrs Credit Team
    </div>
</body>
</html>
