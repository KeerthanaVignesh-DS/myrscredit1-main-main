<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
</head>
<body>
    <div>
        {{$user['name']}}
        <br />
        {{$user['title']}}
        <br />
        {{$user['company']}}
        <br />
        {{$user['address1']}}
        <br />
        {{$user['address2']}}
        <br />
        {{$user['city']}},&nbsp;  {{$user['state']}}&nbsp; {{$user['country']}}&nbsp; {{$user['zip']}}
        <br />
        Email: {{$user['email']}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phone: {{$user['phone']}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Fax: {{$user['fax']}}
        <br />
        ==============================
    </div>
        <table cellspacing="0" cellpadding="0">
          <tr>
            <td>{{ $data['name'] }}</td>
          </tr>
          <tr>
            <td>{{ $data['address1'] }}</td>
          </tr>
          <tr>
            <td>{{ $data['address2'] }}</td>
          </tr>
          <tr>
            <td>{{ $data['city'] }},&nbsp;{{ $data['state'] }}&nbsp;&nbsp;{{ $data['zip'] }}</td>
          </tr>
          <tr>
            <td>{{ $data['phone']}}</td>
          </tr>
          <tr>
            <td>
                @if($data->myrs_product == 1)
                        <p>Summary Credit Report</p>
                    @else
                        <p>Summary Credit Report w/details</p>
                    @endif
            </td>
          </tr>
          <tr>
            <td>
                    @if($data->express_service == 1)
                        <p>Instant Response (4 Office Hours)</p>
                    @elseif ($data->express_service == 2)
                        <p>Rapid Response (8 Office Hours)</p>
                    @elseif ($data->express_service == 3)
                        <p>Fast Response (12 Office Hours)</p>
                    @elseif ($data->express_service == 4)
                        <p>Quick Response (16 Office Hours)</p>
                    @else
                        Standard Response (24+/- Office Hours)
                    @endif
            </td>
          </tr>
          <tr>
            <td>{{ $data['order_amount'] }}</td>
          </tr>
          <tr>
            <td>-------------------------------</td>
          </tr>
        </table>
</body>
</html>
