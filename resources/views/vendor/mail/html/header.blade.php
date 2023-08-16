<tr>
<td class="header">
<a href="https://myhometask.ru" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img style="width: 100px; height: 75px;" src="https://i.ibb.co/WyzZYX2/logo.png" class="logo" alt="Laravel Logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
